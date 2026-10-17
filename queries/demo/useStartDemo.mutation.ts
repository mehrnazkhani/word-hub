"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { startDemoAction } from "./startDemo.action";
import { ROUTES } from "@/constants/routes";

export const useStartDemoMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => startDemoAction(),

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