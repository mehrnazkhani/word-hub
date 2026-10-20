"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
  const challengeRef = useRef<TurnstileChallengeHandle>(null);
  const ownsBusyRef = useRef(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const isDemoBusy = useIsDemoBusy();

  // Any instance running a demo disables all of them, so the security check
  // dialog is never opened twice.
  const isBusy = isLoading || isPending || isPreparing || isDemoBusy;

  const setBusy = useCallback((busy: boolean) => {
    if (!busy && !ownsBusyRef.current) return;

    ownsBusyRef.current = busy;
    setIsDemoBusy(busy);
  }, []);

  const stopLoading = useCallback(() => {
    setIsPreparing(false);
    setBusy(false);
  }, [setBusy]);

  // Never leave the other buttons disabled if this one goes away mid flow.
  useEffect(() => () => setBusy(false), [setBusy]);

  const showDemoError = useCallback(() => {
    toast.error(DEMO_ERROR_MESSAGE, { id: DEMO_ERROR_TOAST_ID });
  }, []);

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
      // The challenge state is shared by every button on the page, so this
      // handle always drives the one widget and the one dialog.
      const challenge = challengeRef.current;
      if (!challenge) {
        throw new Error("Cloudflare Turnstile is not mounted.");
      }

      // Resolves as soon as Cloudflare hands over a token: the one it already
      // solved, the one it happens to be solving right now, or the one the
      // visitor produces in the dialog.
      const captchaToken = await challenge.requestToken();
      setIsPreparing(false);

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

      // Only reached when the visitor actually asked for the demo: a widget
      // that fails while idle never gets here.
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
        {isPreparing
          ? "Preparing demo…"
          : isBusy
            ? "Starting demo…"
            : "Try Demo"}
      </LoadingButton>

      {TURNSTILE_SITE_KEY ? (
        <TurnstileChallenge ref={challengeRef} siteKey={TURNSTILE_SITE_KEY} />
      ) : null}
    </div>
  );
};
