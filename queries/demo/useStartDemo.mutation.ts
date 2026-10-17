"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { startDemoAction } from "./startDemo.action";
import { ROUTES } from "@/constants/routes";

interface StartDemoVariables {
  /**
   * Cloudflare Turnstile token. Supabase Auth rejects anonymous sign-in with
   * "no captcha_token found" while CAPTCHA is enabled.
   */
  captchaToken?: string;
}

export const useStartDemoMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ captchaToken }: StartDemoVariables = {}) =>
      startDemoAction(captchaToken),

    onSuccess: () => {
      // The demo runs as a different (anonymous) user, so any cache entries
      // from a previous session must not carry over.
      queryClient.clear();

      router.push(ROUTES.HOME);
    },

    onError: (error) => {
      console.error("[useStartDemoMutation] Failed to start demo:", error);
      toast.error("Couldn't start the demo. Please try again.", {
        id: "start-demo",
      });
    },
  });
};
