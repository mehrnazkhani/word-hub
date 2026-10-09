"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { connectBotAction } from "./connectBot.action";

export function useConnectBotMutation() {
  return useMutation({
    mutationFn: connectBotAction,
    onSuccess: ({ url }) => {
      window.open(url, "_blank", "noopener,noreferrer");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
