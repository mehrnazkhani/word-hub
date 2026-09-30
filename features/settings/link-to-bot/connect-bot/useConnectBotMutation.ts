"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { connectBotAction } from "./connectBot.action";

export function useConnectBotMutation() {
  return useMutation({
    mutationFn: connectBotAction,
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
