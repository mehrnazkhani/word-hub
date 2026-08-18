"use client";

import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/components/providers/user-provider";
import { savePracticeSessionAction } from "./savePracticeSession.action";
import { queryKeys } from "@/queries/queries";

import type { InsertPractice, Practice } from "@/types/db-aliases";

type SavePracticeSessionProps = Omit<InsertPractice, "user_id">;

export const useSavePracticeSessionMutation = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: (sessionData: SavePracticeSessionProps) =>
      savePracticeSessionAction(sessionData),

    onSuccess: (newSession) => {
      const queryKey = queryKeys.practice.recent(user!.id);

      queryClient.setQueryData<Practice[]>(queryKey, (old) => {
        const updated = [newSession, ...(old ?? [])];
        return updated.slice(0, 5);
      });
    },

    onError: () => {
      toast.error("Failed to save practice session. Please try again.");
    },
  });
};
