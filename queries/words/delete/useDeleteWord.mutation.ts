"use client";

import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/components/providers/user-provider";
import { softDeleteWordAction } from "./deleteWord.action";
import { queryKeys } from "@/queries/queries";
import type { Word } from "@/types/db-aliases";
import type { CategoryWithWordCount } from "@/types/db-aliases";

type WordCache = {
  id: number;
  category_id: number;
  deleted_at: string | null;
  [key: string]: unknown;
};

type DeleteWordMutationProps = {
  word: Word;
};

export const useDeleteWordMutation = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: ({ word }: DeleteWordMutationProps) =>
      softDeleteWordAction({ wordId: word.id }),

    onMutate: async ({ word }) => {
      const { id: wordId, category_id: categoryId } = word;
      const deletedQueryKey = queryKeys.word.deleted(user!.id);
      const recentQueryKey = queryKeys.word.recent(user!.id);
      const byCategoryQueryKey = queryKeys.word.byCategoryId(
        categoryId,
        user!.id,
      );
      const categoriesQueryKey = queryKeys.category.user(user!.id);

      await queryClient.cancelQueries({ queryKey: byCategoryQueryKey });
      await queryClient.cancelQueries({ queryKey: deletedQueryKey });
      await queryClient.cancelQueries({ queryKey: recentQueryKey });
      await queryClient.cancelQueries({ queryKey: categoriesQueryKey });

      const previousWords =
        queryClient.getQueryData<WordCache[]>(byCategoryQueryKey);
      const previousDeleted =
        queryClient.getQueryData<WordCache[]>(deletedQueryKey);
      const previousRecent =
        queryClient.getQueryData<WordCache[]>(recentQueryKey);
      const previousCategories =
        queryClient.getQueryData<CategoryWithWordCount[]>(categoriesQueryKey);

      queryClient.setQueryData<WordCache[]>(byCategoryQueryKey, (old) => {
        if (old === undefined) return undefined;
        return old?.filter((w) => w.id !== wordId);
      });

      queryClient.setQueryData<WordCache[]>(deletedQueryKey, (old) => {
        if (old === undefined) return undefined;
        return [{ ...word, deleted_at: new Date().toISOString() }, ...old];
      });

      queryClient.setQueryData<WordCache[]>(recentQueryKey, (old) => {
        if (old === undefined) return undefined;
        return old.filter((w) => w.id !== wordId);
      });

      if (categoryId !== null) {
        queryClient.setQueryData<CategoryWithWordCount[]>(
          categoriesQueryKey,
          (old) =>
            old?.map((c) =>
              c.id === categoryId
                ? { ...c, wordCount: Math.max(0, c.wordCount - 1) }
                : c,
            ),
        );
      }

      toast.success(`Word ${word.word} deleted successfully`, {
        id: "delete-word",
      });

      return {
        previousWords,
        previousDeleted,
        previousRecent,
        previousCategories,
        deletedQueryKey,
        recentQueryKey,
        byCategoryQueryKey,
        categoriesQueryKey,
      };
    },

    onSuccess: (result) => {
      if (result.error) throw new Error(result.error);
    },

    onError: (_, { word }, context) => {
      if (context?.previousWords !== undefined)
        queryClient.setQueryData(
          context.byCategoryQueryKey,
          context.previousWords,
        );

      if (context?.previousDeleted !== undefined)
        queryClient.setQueryData(
          context.deletedQueryKey,
          context.previousDeleted,
        );

      if (context?.previousRecent !== undefined)
        queryClient.setQueryData(
          context.recentQueryKey,
          context.previousRecent,
        );

      if (context?.previousCategories !== undefined)
        queryClient.setQueryData(
          context.categoriesQueryKey,
          context.previousCategories,
        );

      toast.error("Failed to delete word. Please try again.", {
        id: "delete-word",
      });
    },
  });
};
