"use client";

import * as React from "react";
import { toast } from "sonner";
import { LoadingButton } from "@/components/LoadingButton";
import { useStartDemoMutation } from "@/queries/demo/useStartDemo.mutation";
import {
  setIsDemoBusy,
  useIsDemoBusy,
} from "@/features/landing/hero/useIsDemoBusy";
import {
  TurnstileChallenge,
  TurnstileCancelledError,
  type TurnstileChallengeHandle,
} from "./TurnstileChallenge";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();

const DEMO_ERROR_MESSAGE = "Couldn't start the demo. Please try again.";
const DEMO_ERROR_TOAST_ID = "start-demo";

interface TryDemoButtonProps extends React.ComponentPropsWithoutRef<
  typeof LoadingButton
> {
  isLoading?: boolean;
}

export const TryDemoButton = ({
  className,
  isLoading = false,
  onClick,
  ...props
}: TryDemoButtonProps) => {
  const { mutate: startDemo, isPending } = useStartDemoMutation();
  const challengeRef = React.useRef<TurnstileChallengeHandle>(null);
  const ownsBusyRef = React.useRef(false);
  const [isPreparing, setIsPreparing] = React.useState(false);
  const isDemoBusy = useIsDemoBusy();

  // Any instance running a demo disables all of them, so the security check
  // dialog is never opened twice.
  const isBusy = isLoading || isPending || isPreparing || isDemoBusy;

  const setBusy = React.useCallback((busy: boolean) => {
    if (!busy && !ownsBusyRef.current) return;

    ownsBusyRef.current = busy;
    setIsDemoBusy(busy);
  }, []);

  const stopLoading = React.useCallback(() => {
    setIsPreparing(false);
    setBusy(false);
  }, [setBusy]);

  // Never leave the other buttons disabled if this one goes away mid flow.
  React.useEffect(() => () => setBusy(false), [setBusy]);

  const showDemoError = React.useCallback(() => {
    toast.error(DEMO_ERROR_MESSAGE, { id: DEMO_ERROR_TOAST_ID });
  }, []);

  // Widget level failures (error, timeout, unsupported browser, blocked
  // script). They only interrupt the user when a demo start is in flight,
  // otherwise the widget simply solves again on its own.
  const handleChallengeFailure = React.useCallback(
    (reason: unknown) => {
      console.error("[TryDemoButton] Turnstile widget failed:", reason);

      if (!isPreparing) return;

      stopLoading();
      showDemoError();
    },
    [isPreparing, showDemoError, stopLoading],
  );

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || isBusy) return;

    if (!TURNSTILE_SITE_KEY) {
      console.error(
        "[TryDemoButton] NEXT_PUBLIC_TURNSTILE_SITE_KEY is missing. Add it to .env.local and to the deployment environment to enable the demo.",
      );
      showDemoError();
      return;
    }

    setBusy(true);
    setIsPreparing(true);

    try {
      const challenge = challengeRef.current;
      if (!challenge) {
        throw new Error("Cloudflare Turnstile is not mounted.");
      }

      // Resolves as soon as Cloudflare hands over a token, whether it solved
      // silently or the visitor completed the challenge in the dialog.
      const captchaToken = await challenge.requestToken();

      startDemo(
        { captchaToken },
        {
          onSuccess: () => stopLoading(),
          // The mutation already logs and toasts; the token is single use, so
          // the widget has to start over before the next attempt.
          onError: () => {
            challengeRef.current?.reset();
            stopLoading();
          },
        },
      );
    } catch (error) {
      challengeRef.current?.reset();
      stopLoading();

      // Dismissing the security check is not a failure worth reporting.
      if (error instanceof TurnstileCancelledError) {
        console.log("[TryDemoButton] Security check cancelled.");
        return;
      }

      console.error("[TryDemoButton] Failed to start demo:", error);
      showDemoError();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <LoadingButton
        type="button"
        variant="outline"
        size="lg"
        isLoading={isBusy}
        className={className}
        aria-busy={isBusy}
        onClick={handleClick}
        {...props}
      >
        {isBusy ? "Starting demo…" : "Try Demo"}
      </LoadingButton>

      {TURNSTILE_SITE_KEY ? (
        <TurnstileChallenge
          ref={challengeRef}
          siteKey={TURNSTILE_SITE_KEY}
          onFailure={handleChallengeFailure}
        />
      ) : null}
    </div>
  );
};
