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
      const recentQueryKey = queryKeys.practice.recent(user!.id);
      const weeklyQueryKey = queryKeys.practice.weekly(user!.id);

      // recent practices update
      if (queryClient.getQueryData(recentQueryKey) !== undefined) {
        queryClient.setQueryData<Practice[]>(recentQueryKey, (old) => {
          const updated = [newSession, ...(old ?? [])];
          return updated.slice(0, 5);
        });
      }

      //  weekly practices update
      if (queryClient.getQueryData(weeklyQueryKey) !== undefined) {
        queryClient.setQueryData<{ data: Practice[] | null }>(
          weeklyQueryKey,
          (old) => ({ data: [...(old?.data ?? []), newSession] }),
        );
      }
    },

    onError: () => {
      toast.error("Failed to save practice session. Please try again.");
    },
  });
};
