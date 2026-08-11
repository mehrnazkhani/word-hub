"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/components/providers/user-provider";
import { moveWordAction } from "./moveWord.action";
import { queryKeys } from "@/queries/queries";
import { toast } from "sonner";
import type { Word } from "@/types/db-aliases";

type WordCache = {
  id: number;
  category_id: number;
  [key: string]: unknown;
};

type MoveWordMutationProps = {
  word: Word;
  toCategoryId: number;
};

export const useMoveWordMutation = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: ({ word, toCategoryId }: MoveWordMutationProps) =>
      moveWordAction({ wordId: word.id, toCategoryId }),

    onMutate: async ({ word, toCategoryId }) => {
      const { id: wordId, category_id: fromCategoryId } = word;
      const fromQueryKey = queryKeys.word.byCategoryId(
        fromCategoryId,
        user!.id,
      );
      const toQueryKey = queryKeys.word.byCategoryId(toCategoryId, user!.id);

      await Promise.all([
        queryClient.cancelQueries({ queryKey: fromQueryKey }),
        queryClient.cancelQueries({ queryKey: toQueryKey }),
      ]);

      const previousFrom = queryClient.getQueryData<WordCache[]>(fromQueryKey);
      const previousTo = queryClient.getQueryData<WordCache[]>(toQueryKey);

      queryClient.setQueryData<WordCache[]>(fromQueryKey, (old) => {
        if (old === undefined) return undefined;
        return old.filter((w) => w.id !== wordId);
      });

      queryClient.setQueryData<WordCache[]>(toQueryKey, (old) => {
        if (old === undefined) return undefined;
        const moved = previousFrom?.find((w) => w.id === wordId);
        if (!moved) return old;
        return [...old, { ...moved, category_id: toCategoryId }];
      });

      toast.success(`Word "${word.word}" moved successfully`, {
        id: "move-word",
      });

      return { previousFrom, previousTo, fromQueryKey, toQueryKey };
    },

    onSuccess: (result) => {
      if (result.error) throw new Error(result.error);
    },

    onError: (_, _variables, context) => {
      if (context?.previousFrom !== undefined)
        queryClient.setQueryData(context.fromQueryKey, context.previousFrom);

      if (context?.previousTo !== undefined)
        queryClient.setQueryData(context.toQueryKey, context.previousTo);

      toast.error("Failed to move word. Please try again.", {
        id: "move-word",
      });
    },
  });
};
