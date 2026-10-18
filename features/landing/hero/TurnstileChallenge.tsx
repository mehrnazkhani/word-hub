"use client";

import * as React from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/** Turnstile tokens stay valid for 5 minutes; never hand out an older one. */
const TOKEN_MAX_AGE_MS = 4 * 60 * 1000;
/** Upper bound for loading the Turnstile script and rendering the widget. */
const WIDGET_READY_TIMEOUT_MS = 10_000;
/** Upper bound for solving a challenge, including its interactive steps. */
const TOKEN_TIMEOUT_MS = 45_000;
/**
 * Backoff for the background retries that follow a widget failure nobody was
 * waiting for. A broken widget is never reported to the visitor, it simply
 * solves again a moment later.
 */
const SILENT_RETRY_DELAYS_MS = [0, 1_500, 4_000];
/** There is exactly one widget for the whole page. */
const WIDGET_ID = "cf-turnstile-demo";

/** Thrown when the visitor dismisses the security check dialog. */
export class TurnstileCancelledError extends Error {
  constructor() {
    super("The security check was cancelled.");
    this.name = "TurnstileCancelledError";
  }
}

export interface TurnstileChallengeHandle {
  /**
   * Returns a single-use token. It resolves with the token Cloudflare already
   * solved, with the one it happens to be solving right now, or with the one
   * the visitor produces in the dialog. It never restarts a solve that is
   * already running.
   */
  requestToken: () => Promise<string>;
  /** Drops the current token and puts the widget back into its initial state. */
  reset: () => void;
}

type DeferredTokenRequest = {
  promise: Promise<string>;
  resolve: (token: string) => void;
  reject: (error: Error) => void;
  timer: number;
};

type WidgetReadyRequest = {
  resolve: () => void;
  reject: (error: Error) => void;
  timer: number;
};

/*
 * The whole challenge state lives here, outside of React, on purpose.
 *
 * Every `TryDemoButton` on the page talks to this one store, so there is a
 * single widget, a single token and a single dialog no matter how many buttons
 * are rendered. A click on any of them always reaches the same security check.
 */

const listeners = new Set<() => void>();

let isDialogOpen = false;
/** Single use token kept for the next click. */
let cachedToken: { token: string; issuedAt: number } | null = null;
/** The demo start that is waiting for a token right now. */
let activeRequest: DeferredTokenRequest | null = null;
/** A solve is in flight, silently or behind the dialog. */
let isSolving = false;
/** Cloudflare is waiting for the visitor to interact. */
let needsInteraction = false;
/**
 * Run generation, bumped on every restart.
 *
 * Because `resetWidget()` refuses to run while a solve is in flight, two runs
 * can never overlap, and a callback always belongs to the run that is current
 * at the time it arrives. The counter still makes that explicit: a dialog is
 * only ever closed by the run that opened it, and a token the widget no longer
 * reports belongs to a run that is already gone.
 */
let currentRunId = 0;
/** Run that opened the dialog, so only that run may close it. */
let dialogRunId: number | null = null;
let widget: TurnstileInstance | undefined;
let isWidgetReady = false;
let isScriptBlocked = false;
let silentRetryAttempt = 0;
let silentRetryTimer: number | null = null;
let readyRequests: WidgetReadyRequest[] = [];

function publishDialog(next: boolean) {
  if (isDialogOpen === next) return;

  isDialogOpen = next;
  listeners.forEach((listener) => listener());
}

/**
 * Shows the challenge. Refuses to open while a dialog is already up, so a
 * click landing on an open dialog can never turn it into an open/close flash.
 */
function openDialog() {
  if (isDialogOpen) return;

  dialogRunId = currentRunId;
  publishDialog(true);
}

function closeDialog() {
  // A dialog belongs to the run that opened it: a late callback from a run
  // that has already been replaced never closes a newer one.
  if (dialogRunId !== null && dialogRunId !== currentRunId) return;

  dialogRunId = null;
  publishDialog(false);
}

/** Used when the run itself is gone: its dialog has to go with it. */
function closeDialogForRun() {
  dialogRunId = null;
  publishDialog(false);
}

function clearSilentRetry() {
  if (silentRetryTimer === null) return;

  window.clearTimeout(silentRetryTimer);
  silentRetryTimer = null;
}

function flushReadyRequests(error?: Error) {
  const pending = readyRequests;
  readyRequests = [];

  pending.forEach((request) => {
    window.clearTimeout(request.timer);
    if (error) request.reject(error);
    else request.resolve();
  });
}

/**
 * Puts the widget back into its initial state so it solves again.
 *
 * Refuses to run while a solve is in flight: `reset()` on a running solve
 * throws its progress away, Cloudflare starts over from scratch, and the
 * visitor is left waiting seconds for a dialog that may never show up.
 */
function resetWidget() {
  clearSilentRetry();
  if (isSolving) return;

  cachedToken = null;
  needsInteraction = false;
  currentRunId += 1;
  closeDialogForRun();

  isSolving = true;
  widget?.reset();
}

function scheduleSilentRetry() {
  if (silentRetryTimer !== null) return;

  const delay = SILENT_RETRY_DELAYS_MS[silentRetryAttempt];
  if (delay === undefined) return;

  silentRetryAttempt += 1;
  silentRetryTimer = window.setTimeout(() => {
    silentRetryTimer = null;
    resetWidget();
  }, delay);
}

/**
 * Every widget failure goes through here. With a demo start in flight the
 * visitor gets the error; an idle widget just solves again quietly.
 */
function failWidget(error: Error) {
  isSolving = false;
  needsInteraction = false;
  closeDialog();

  const request = activeRequest;
  activeRequest = null;

  if (!request) {
    scheduleSilentRetry();
    return;
  }

  window.clearTimeout(request.timer);
  request.reject(error);
}

function waitForWidget(): Promise<void> {
  // A blocked script (offline, firewall, extension) never recovers on its own.
  if (isScriptBlocked) {
    return Promise.reject(
      new Error("The Cloudflare Turnstile script could not be loaded."),
    );
  }

  if (isWidgetReady) return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    const timer = window.setTimeout(() => {
      readyRequests = readyRequests.filter(
        (request) => request.timer !== timer,
      );
      reject(new Error("Timed out while loading Cloudflare Turnstile."));
    }, WIDGET_READY_TIMEOUT_MS);

    readyRequests.push({ resolve, reject, timer });
  });
}

async function prepareRequest(request: DeferredTokenRequest) {
  try {
    await waitForWidget();
  } catch (error) {
    if (activeRequest === request) {
      failWidget(error instanceof Error ? error : new Error(String(error)));
    }
    return;
  }

  if (activeRequest !== request) return;

  // A challenge is already waiting, from the silent solve that started on page
  // load: show it instead of throwing it away.
  if (needsInteraction) {
    openDialog();
    return;
  }

  // Already solving: the widget started on page load and often finishes on its
  // own. Waiting for it is what makes a single click enough.
  if (isSolving) return;

  resetWidget();
}

function requestToken(): Promise<string> {
  const cached = cachedToken;
  if (cached && Date.now() - cached.issuedAt < TOKEN_MAX_AGE_MS) {
    cachedToken = null;
    return Promise.resolve(cached.token);
  }

  // Another button is already starting a demo (or the dialog is already open):
  // join that attempt instead of starting a second one.
  if (activeRequest) return activeRequest.promise;

  let resolveRequest!: (token: string) => void;
  let rejectRequest!: (error: Error) => void;
  const promise = new Promise<string>((resolve, reject) => {
    resolveRequest = resolve;
    rejectRequest = reject;
  });

  const request: DeferredTokenRequest = {
    promise,
    resolve: resolveRequest,
    reject: rejectRequest,
    timer: 0,
  };
  request.timer = window.setTimeout(() => {
    if (activeRequest !== request) return;

    failWidget(
      new Error("Timed out while waiting for a Cloudflare Turnstile token."),
    );
  }, TOKEN_TIMEOUT_MS);

  activeRequest = request;
  void prepareRequest(request);

  return promise;
}

/**
 * The visitor dismissed the dialog. Only the dismiss itself cancels the demo
 * start: a click landing next to the dialog must never throw the running
 * challenge away.
 */
function cancelChallenge() {
  cachedToken = null;
  needsInteraction = false;

  // The dialog only exists while Cloudflare waits for the visitor, so nothing
  // is solving here and restarting is safe. Restarting is what makes the next
  // click predictable.
  currentRunId += 1;
  closeDialogForRun();

  isSolving = true;
  widget?.reset();

  const request = activeRequest;
  activeRequest = null;
  if (!request) return;

  window.clearTimeout(request.timer);
  request.reject(new TurnstileCancelledError());
}

function handleWidgetLoad() {
  isWidgetReady = true;
  // Managed mode starts solving the moment the widget renders.
  isSolving = true;
  currentRunId += 1;
  dialogRunId = null;
  flushReadyRequests();
}

function handleSuccess(token: string) {
  // A token from a run that has already been replaced does not match the
  // widget any more: it belongs to the previous run and is ignored.
  const currentToken = widget?.getResponse();
  if (currentToken !== undefined && currentToken !== token) return;

  isSolving = false;
  needsInteraction = false;
  silentRetryAttempt = 0;
  clearSilentRetry();

  const request = activeRequest;
  if (request) {
    activeRequest = null;
    closeDialog();
    window.clearTimeout(request.timer);
    request.resolve(token);
    return;
  }

  // Nobody is waiting: managed mode usually solves silently long before anyone
  // clicks, and that token is kept for the click.
  cachedToken = { token, issuedAt: Date.now() };
}

function handleBeforeInteractive() {
  needsInteraction = true;

  // Only ever in response to a click, so nothing pops up on page load.
  if (!activeRequest) return;

  openDialog();
}

function handleAfterInteractive() {
  // Never closes the dialog: that is what made it flash for a few frames right
  // after opening. `onSuccess` owns the closing, and only for the run that
  // opened it.
  needsInteraction = false;
}

function handleExpire() {
  cachedToken = null;
  // Managed mode refreshes the token on its own; if it does not, the silent
  // retry does. A click in the meantime waits for the fresh token.
  isSolving = false;
  scheduleSilentRetry();
}

function handleWidgetError(reason: unknown) {
  failWidget(
    reason instanceof Error
      ? reason
      : new Error(`Cloudflare Turnstile error: ${String(reason)}`),
  );
}

function handleScriptError() {
  isScriptBlocked = true;
  failWidget(new Error("The Cloudflare Turnstile script could not be loaded."));
}

function registerWidget(instance: TurnstileInstance | undefined) {
  widget = instance;
}

function unregisterWidget() {
  widget = undefined;
  isWidgetReady = false;
  clearSilentRetry();
  closeDialog();

  const request = activeRequest;
  activeRequest = null;
  if (request) {
    window.clearTimeout(request.timer);
    request.reject(new Error("Cloudflare Turnstile was removed."));
  }

  flushReadyRequests(new Error("Cloudflare Turnstile was removed."));
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = () => isDialogOpen;
const getServerSnapshot = () => false;

/** Owner of the single widget, so extra buttons render nothing at all. */
let hostOwner: object | null = null;

export const TurnstileChallenge = React.forwardRef<
  TurnstileChallengeHandle,
  { siteKey: string }
>(({ siteKey }, ref) => {
  const ownerRef = React.useRef<object | null>(null);
  if (ownerRef.current === null) ownerRef.current = {};

  const [isHost, setIsHost] = React.useState(false);
  React.useEffect(() => {
    const owns = hostOwner === null;
    if (owns) hostOwner = ownerRef.current;
    setIsHost(owns);

    return () => {
      if (hostOwner === ownerRef.current) hostOwner = null;
    };
  }, []);

  const isDialogOpen = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  React.useImperativeHandle(
    ref,
    () => ({ requestToken, reset: resetWidget }),
    [],
  );

  // Radix only listens for Escape on its topmost layer, and a force mounted
  // sibling dialog counts as one, so the key is handled here as well.
  React.useEffect(() => {
    if (!isDialogOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") cancelChallenge();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isDialogOpen]);

  // Snapshotted on purpose: the theme is part of the render parameters, and
  // changing it after mount would recreate the widget mid challenge.
  const [widgetTheme] = React.useState<"light" | "dark">(() =>
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark")
      ? "dark"
      : "light",
  );

  const setWidgetRef = React.useCallback(
    (instance: TurnstileInstance | null) => {
      if (instance) {
        registerWidget(instance);
        return;
      }

      unregisterWidget();
    },
    [],
  );

  // A second button would start a second widget fighting for the same token.
  if (!isHost) return null;

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) cancelChallenge();
      }}
    >
      <DialogContent
        // Kept mounted so the widget never stops running while closed.
        forceMount
        aria-hidden={isDialogOpen ? undefined : true}
        // Inline so it wins over the pointer events Radix sets on its own.
        style={isDialogOpen ? undefined : { pointerEvents: "none", opacity: 0 }}
        // Outside clicks used to dismiss the dialog, which cancelled the very
        // demo start that opened it: the next "Try Demo" press landed on the
        // overlay and threw the running challenge away.
        onPointerDownOutside={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
        // The overlay is only mounted once the dialog opens, which places it
        // after the already mounted content: stay above it in the stacking
        // order so the challenge can be clicked. Wide enough for the 300px
        // widget plus its padding.
        className="z-51 w-84 max-w-[calc(100%-2rem)] sm:max-w-84"
      >
        <DialogHeader className="gap-1.5 pr-6 text-center">
          <DialogTitle>Quick security check</DialogTitle>
          <DialogDescription>
            Please confirm you&apos;re human to start the demo.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center">
          <Turnstile
            ref={setWidgetRef}
            id={WIDGET_ID}
            siteKey={siteKey}
            scriptOptions={{ onError: handleScriptError }}
            options={{
              // Managed mode: Cloudflare decides when to solve, the token then
              // arrives through `onSuccess`.
              execution: "render",
              // Nothing is shown until interactivity is actually required.
              appearance: "interaction-only",
              theme: widgetTheme,
            }}
            onWidgetLoad={handleWidgetLoad}
            onBeforeInteractive={handleBeforeInteractive}
            onAfterInteractive={handleAfterInteractive}
            onSuccess={handleSuccess}
            onExpire={handleExpire}
            onError={handleWidgetError}
            onTimeout={() => handleWidgetError("challenge timed out")}
            onUnsupported={() => handleWidgetError("browser is not supported")}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
});

TurnstileChallenge.displayName = "TurnstileChallenge";
