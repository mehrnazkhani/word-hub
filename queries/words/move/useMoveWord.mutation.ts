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

      await Promise.all([
        queryClient.cancelQueries({
          queryKey: queryKeys.word.byCategoryId(fromCategoryId, user!.id),
        }),
        queryClient.cancelQueries({
          queryKey: queryKeys.word.byCategoryId(toCategoryId, user!.id),
        }),
      ]);

      const previousFrom = queryClient.getQueryData<WordCache[]>(
        queryKeys.word.byCategoryId(fromCategoryId, user!.id),
      );
      const previousTo = queryClient.getQueryData<WordCache[]>(
        queryKeys.word.byCategoryId(toCategoryId, user!.id),
      );

      queryClient.setQueryData<WordCache[]>(
        queryKeys.word.byCategoryId(fromCategoryId, user!.id),
        (old) => old?.filter((w) => w.id !== wordId) ?? [],
      );

      queryClient.setQueryData<WordCache[]>(
        queryKeys.word.byCategoryId(toCategoryId, user!.id),
        (old) => {
          if (!old) return old;
          const word = previousFrom?.find((w) => w.id === wordId);
          if (!word) return old;
          return [...old, { ...word, category_id: toCategoryId }];
        },
      );

      toast.success(`Word ${word.word} moved successfully`, {
        id: "move-word",
      });

      return { previousFrom, previousTo };
    },

    onSuccess: (result, { word, toCategoryId }) => {
      if (result.error) throw new Error(result.error);

      queryClient.invalidateQueries({
        queryKey: queryKeys.word.byCategoryId(word.category_id, user!.id),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.word.byCategoryId(toCategoryId, user!.id),
      });
    },

    onError: (_, { word, toCategoryId }, context) => {
      if (context?.previousFrom) {
        queryClient.setQueryData(
          queryKeys.word.byCategoryId(word.category_id, user!.id),
          context.previousFrom,
        );
      }
      if (context?.previousTo) {
        queryClient.setQueryData(
          queryKeys.word.byCategoryId(toCategoryId, user!.id),
          context.previousTo,
        );
      }

      toast.error("Failed to move word. Please try again.", {
        id: "move-word",
      });
    },
  });
};
