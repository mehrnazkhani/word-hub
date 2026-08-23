"use client";

import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/components/providers/user-provider";
import { updateWordsScoreAction } from "./updateWordsScore.action";
import { queryKeys } from "@/queries/queries";
import type { Word } from "@/types/db-aliases";

type WordScoreUpdate = {
  id: number;
  score: number;
};

export const useUpdateWordsScoreMutation = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: (words: WordScoreUpdate[]) => updateWordsScoreAction(words),

    onSuccess: (updatedWords) => {
      if (!user) return;

      const scoreById = new Map(updatedWords.map((w) => [w.id, w.score]));

      const applyScoreUpdate = (queryKey: readonly unknown[]) => {
        if (queryClient.getQueryData(queryKey) === undefined) return;

        queryClient.setQueryData<Word[]>(queryKey, (old) =>
          old?.map((word) =>
            scoreById.has(word.id)
              ? { ...word, score: scoreById.get(word.id)! }
              : word,
          ),
        );
      };

      const categoryIds = new Set(
        updatedWords
          .map((w) => w.category_id)
          .filter((id): id is number => id !== null),
      );

      categoryIds.forEach((categoryId) => {
        applyScoreUpdate(queryKeys.word.byCategoryId(categoryId, user.id));
      });

      applyScoreUpdate(queryKeys.word.recent(user.id));
    },

    onError: () => {
      toast.error("Failed to update words score. Please try again.");
    },
  });
};
