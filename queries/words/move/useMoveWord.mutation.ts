"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/components/providers/user-provider";
import { moveWordAction } from "./moveWord.action";
import { queryKeys } from "@/queries/queries";
import { toast } from "sonner";
import type { Word } from "@/types/db-aliases";
import type { CategoryWithWordCount } from "@/types/db-aliases";

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
      const categoriesQueryKey = queryKeys.category.user(user!.id);

      await Promise.all([
        queryClient.cancelQueries({ queryKey: fromQueryKey }),
        queryClient.cancelQueries({ queryKey: toQueryKey }),
        queryClient.cancelQueries({ queryKey: categoriesQueryKey }),
      ]);

      const previousFrom = queryClient.getQueryData<WordCache[]>(fromQueryKey);
      const previousTo = queryClient.getQueryData<WordCache[]>(toQueryKey);
      const previousCategories =
        queryClient.getQueryData<CategoryWithWordCount[]>(categoriesQueryKey);

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

      queryClient.setQueryData<CategoryWithWordCount[]>(
        categoriesQueryKey,
        (old) =>
          old?.map((c) => {
            if (c.id === fromCategoryId)
              return { ...c, wordCount: Math.max(0, c.wordCount - 1) };
            if (c.id === toCategoryId)
              return { ...c, wordCount: c.wordCount + 1 };
            return c;
          }),
      );

      toast.success(`Word "${word.word}" moved successfully`, {
        id: "move-word",
      });

      return {
        previousFrom,
        previousTo,
        previousCategories,
        fromQueryKey,
        toQueryKey,
        categoriesQueryKey,
      };
    },

    onSuccess: (result) => {
      if (result.error) throw new Error(result.error);
    },

    onError: (_, _variables, context) => {
      if (context?.previousFrom !== undefined)
        queryClient.setQueryData(context.fromQueryKey, context.previousFrom);

      if (context?.previousTo !== undefined)
        queryClient.setQueryData(context.toQueryKey, context.previousTo);

      if (context?.previousCategories !== undefined)
        queryClient.setQueryData(
          context.categoriesQueryKey,
          context.previousCategories,
        );

      toast.error("Failed to move word. Please try again.", {
        id: "move-word",
      });
    },
  });
};
