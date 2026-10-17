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

/** Thrown when the visitor dismisses the security check dialog. */
export class TurnstileCancelledError extends Error {
  constructor() {
    super("The security check was cancelled.");
    this.name = "TurnstileCancelledError";
  }
}

type PendingTokenRequest = {
  resolve: (token: string) => void;
  reject: (error: Error) => void;
  timer: number;
};

export interface TurnstileChallengeHandle {
  /**
   * Returns a single-use token, making the widget solve again when the cached
   * one is missing or stale.
   */
  requestToken: () => Promise<string>;
  /** Drops the current token and puts the widget back into its initial state. */
  reset: () => void;
}

interface TurnstileChallengeProps {
  siteKey: string;
  /** Widget level failure (error, timeout, blocked script). */
  onFailure?: (reason: unknown) => void;
}

/**
 * Cloudflare Turnstile in managed mode (`execution: "render"`) with the
 * `interaction-only` appearance: nothing is shown unless Cloudflare decides
 * the visitor has to prove they are human.
 *
 * The widget lives inside a dialog that is force mounted, so it keeps running
 * while the dialog is closed and an interactive challenge can never be missed.
 * Closed, the dialog is only made invisible with opacity (never `display:
 * none`) to keep the widget laid out and solvable.
 *
 * Every instance owns its own dialog, so several of them can safely live on
 * the same page.
 */
export const TurnstileChallenge = React.forwardRef<
  TurnstileChallengeHandle,
  TurnstileChallengeProps
>(({ siteKey, onFailure }, ref) => {
  const turnstileRef = React.useRef<TurnstileInstance | undefined>(undefined);
  const cachedTokenRef = React.useRef<{
    token: string;
    issuedAt: number;
  } | null>(null);
  const pendingRef = React.useRef<PendingTokenRequest | null>(null);
  const isReadyRef = React.useRef(false);
  const scriptFailedRef = React.useRef(false);
  /** Set while Cloudflare is waiting for the visitor to interact. */
  const needsInteractionRef = React.useRef(false);
  const onReadyRef = React.useRef<(() => void) | null>(null);
  const onFailureRef = React.useRef(onFailure);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  // Snapshotted on purpose: the theme is part of the render parameters, and
  // changing it after mount would recreate the widget mid challenge.
  const [widgetTheme] = React.useState<"light" | "dark">(() =>
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark")
      ? "dark"
      : "light",
  );

  React.useEffect(() => {
    onFailureRef.current = onFailure;
  });

  // The library falls back to the same hardcoded container id for every
  // instance, so give each widget a unique one for when several are mounted.
  const containerId = `cf-turnstile-${React.useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const reportFailure = React.useCallback((error: Error) => {
    cachedTokenRef.current = null;
    needsInteractionRef.current = false;
    setIsDialogOpen(false);

    const pending = pendingRef.current;
    pendingRef.current = null;
    if (pending) {
      window.clearTimeout(pending.timer);
      pending.reject(error);
    }

    onFailureRef.current?.(error);
  }, []);

  const resolveToken = React.useCallback((token: string) => {
    const pending = pendingRef.current;
    pendingRef.current = null;
    if (!pending) return;

    window.clearTimeout(pending.timer);
    pending.resolve(token);
  }, []);

  const handleSuccess = React.useCallback(
    (token: string) => {
      const isRequested = Boolean(pendingRef.current);
      needsInteractionRef.current = false;

      // A token can only be used once: hand it over, or keep it for the next
      // click (managed mode solves on its own, often before anyone clicks).
      cachedTokenRef.current = isRequested
        ? null
        : { token, issuedAt: Date.now() };

      setIsDialogOpen(false);
      if (isRequested) resolveToken(token);
    },
    [resolveToken],
  );

  // Cloudflare is about to need the visitor: show the widget to them. Only
  // ever in response to a click though, so nothing pops up on page load and a
  // single dialog is enough when several buttons share the page.
  const handleBeforeInteractive = React.useCallback(() => {
    needsInteractionRef.current = true;

    if (pendingRef.current) setIsDialogOpen(true);
  }, []);

  const handleAfterInteractive = React.useCallback(() => {
    needsInteractionRef.current = false;

    setIsDialogOpen(false);
  }, []);

  const handleExpire = React.useCallback(() => {
    console.log("[TurnstileChallenge] Turnstile token expired.");
    // Managed mode solves again on its own, we only forget the stale token.
    cachedTokenRef.current = null;
  }, []);

  const handleError = React.useCallback(
    (reason: unknown) => {
      console.error(
        "[TurnstileChallenge] Cloudflare Turnstile failed:",
        reason,
      );
      reportFailure(
        reason instanceof Error
          ? reason
          : new Error(`Cloudflare Turnstile error: ${String(reason)}`),
      );
    },
    [reportFailure],
  );

  const handleWidgetLoad = React.useCallback(() => {
    isReadyRef.current = true;

    const onReady = onReadyRef.current;
    onReadyRef.current = null;
    onReady?.();
  }, []);

  const waitForWidget = React.useCallback(async () => {
    // A blocked script (offline, firewall, extension) never recovers on its own.
    if (scriptFailedRef.current) {
      throw new Error("The Cloudflare Turnstile script could not be loaded.");
    }

    if (isReadyRef.current) return;

    await new Promise<void>((resolve, reject) => {
      const timer = window.setTimeout(() => {
        onReadyRef.current = null;
        reject(new Error("Timed out while loading Cloudflare Turnstile."));
      }, WIDGET_READY_TIMEOUT_MS);

      onReadyRef.current = () => {
        window.clearTimeout(timer);
        resolve();
      };
    });
  }, []);

  const reset = React.useCallback(() => {
    cachedTokenRef.current = null;
    needsInteractionRef.current = false;
    setIsDialogOpen(false);

    const pending = pendingRef.current;
    pendingRef.current = null;
    if (pending) {
      window.clearTimeout(pending.timer);
      pending.reject(new Error("Cloudflare Turnstile was reset."));
    }

    turnstileRef.current?.reset();
  }, []);

  const cancel = React.useCallback(() => {
    cachedTokenRef.current = null;
    needsInteractionRef.current = false;

    const pending = pendingRef.current;
    pendingRef.current = null;
    if (pending) {
      window.clearTimeout(pending.timer);
      pending.reject(new TurnstileCancelledError());
    }

    turnstileRef.current?.reset();
  }, []);

  const requestToken = React.useCallback(async () => {
    const cached = cachedTokenRef.current;
    if (cached && Date.now() - cached.issuedAt < TOKEN_MAX_AGE_MS) {
      cachedTokenRef.current = null;
      return cached.token;
    }

    await waitForWidget();

    const turnstile = turnstileRef.current;
    if (!turnstile) {
      throw new Error("Cloudflare Turnstile is unavailable.");
    }

    return new Promise<string>((resolve, reject) => {
      pendingRef.current = {
        resolve,
        reject,
        timer: window.setTimeout(() => {
          reportFailure(
            new Error(
              "Timed out while waiting for a Cloudflare Turnstile token.",
            ),
          );
        }, TOKEN_TIMEOUT_MS),
      };

      // In managed mode `execute()` is a no-op, while `reset()` puts the
      // widget back into its initial state, which solves again and delivers
      // the new token through `onSuccess`. Should that solve need the
      // visitor, `onBeforeInteractive` opens the dialog.
      if (needsInteractionRef.current) {
        // Already sitting on a challenge from an earlier solve: show it
        // instead of throwing that attempt away.
        setIsDialogOpen(true);
      } else {
        turnstile.reset();
      }
    });
  }, [reportFailure, waitForWidget]);

  React.useImperativeHandle(ref, () => ({ requestToken, reset }), [
    requestToken,
    reset,
  ]);

  // Radix only listens for Escape on its topmost layer, and a force mounted
  // sibling dialog counts as one, so the key is handled here as well.
  React.useEffect(() => {
    if (!isDialogOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") cancel();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [cancel, isDialogOpen]);

  React.useEffect(
    () => () => {
      if (pendingRef.current) window.clearTimeout(pendingRef.current.timer);
      if (onReadyRef.current) {
        onReadyRef.current = null;
      }
    },
    [],
  );

  const scriptOptions = React.useMemo(
    () => ({
      onError: () => {
        scriptFailedRef.current = true;
        handleError("script failed to load");
      },
    }),
    [handleError],
  );

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) cancel();
      }}
    >
      <DialogContent
        // Kept mounted so the widget never stops running while closed.
        forceMount
        aria-hidden={isDialogOpen ? undefined : true}
        // Inline so it wins over the pointer events Radix sets on its own.
        style={isDialogOpen ? undefined : { pointerEvents: "none", opacity: 0 }}
        // The overlay is only mounted once the dialog opens, which places it
        // after the already mounted content: stay above it in the stacking
        // order so the challenge can be clicked. Wide enough for the 300px
        // widget plus its padding.
        className="z-[51] w-[21rem] max-w-[calc(100%-2rem)] sm:max-w-[21rem]"
      >
        <DialogHeader className="gap-1.5 pr-6 text-center">
          <DialogTitle>Quick security check</DialogTitle>
          <DialogDescription>
            Please confirm you&apos;re human to start the demo.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center">
          <Turnstile
            ref={turnstileRef}
            id={containerId}
            siteKey={siteKey}
            scriptOptions={scriptOptions}
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
            onError={handleError}
            onTimeout={() => handleError("challenge timed out")}
            onUnsupported={() => handleError("browser is not supported")}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
});

TurnstileChallenge.displayName = "TurnstileChallenge";
