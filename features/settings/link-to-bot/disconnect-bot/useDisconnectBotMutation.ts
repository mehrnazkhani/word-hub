"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useUser } from "@/components/providers/user-provider";
import { queryKeys } from "@/queries/queries";
import { disconnectBotAction } from "./disconnectBot.action";

export function useDisconnectBotMutation() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: disconnectBotAction,
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.telegram.status(user!.id), data);
      toast.success("Bot disconnected successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
