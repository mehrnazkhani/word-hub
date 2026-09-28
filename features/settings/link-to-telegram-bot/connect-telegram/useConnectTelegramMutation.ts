"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { connectTelegramAction } from "./connectTelegram.action";

export function useConnectTelegramMutation() {
  return useMutation({
    mutationFn: connectTelegramAction,
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
