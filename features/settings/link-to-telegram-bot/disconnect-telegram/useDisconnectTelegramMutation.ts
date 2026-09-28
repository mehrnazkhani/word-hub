"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useUser } from "@/components/providers/user-provider";
import { queryKeys } from "@/queries/queries";
import { disconnectTelegramAction } from "./disconnectTelegram.action";

export function useDisconnectTelegramMutation() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: disconnectTelegramAction,
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.telegram.status(user!.id), data);
      toast.success("Telegram disconnected successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
