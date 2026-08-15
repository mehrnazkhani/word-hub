"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/components/providers/user-provider";
import { restoreWordAction } from "./restoreWord.action";
import { queryKeys } from "../../queries";
import { toast } from "sonner";
import type { Word } from "@/types/db-aliases";
import type { CategoryWithWordCount } from "@/types/db-aliases";

type WordCache = {
  id: number;
  category_id: number;
  deleted_at: string | null;
  [key: string]: unknown;
};

type RestoreWordMutationProps = {
  word: Word;
};

export const useRestoreWordMutation = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: ({ word }: RestoreWordMutationProps) =>
      restoreWordAction({ wordId: word.id }),

    onMutate: async ({ word }) => {
      const { id: wordId, category_id: categoryId } = word;
      const deletedQueryKey = queryKeys.word.deleted(user!.id);
      const byCategoryQueryKey = queryKeys.word.byCategoryId(
        categoryId,
        user!.id,
      );
      const recentQueryKey = queryKeys.word.recent(user!.id);
      const categoriesQueryKey = queryKeys.category.user(user!.id);

      await queryClient.cancelQueries({ queryKey: deletedQueryKey });
      await queryClient.cancelQueries({ queryKey: byCategoryQueryKey });
      await queryClient.cancelQueries({ queryKey: recentQueryKey });
      await queryClient.cancelQueries({ queryKey: categoriesQueryKey });

      const previousDeleted =
        queryClient.getQueryData<WordCache[]>(deletedQueryKey);
      const previousByCategory =
        queryClient.getQueryData<WordCache[]>(byCategoryQueryKey);
      const previousRecent =
        queryClient.getQueryData<WordCache[]>(recentQueryKey);
      const previousCategories =
        queryClient.getQueryData<CategoryWithWordCount[]>(categoriesQueryKey);

      queryClient.setQueryData<WordCache[]>(deletedQueryKey, (old) => {
        if (old === undefined) return undefined;
        return old.filter((w) => w.id !== wordId);
      });

      queryClient.setQueryData<WordCache[]>(byCategoryQueryKey, (old) => {
        if (old === undefined) return undefined;
        return [...old, { ...word, deleted_at: null }];
      });

      queryClient.setQueryData<WordCache[]>(recentQueryKey, (old) => {
        if (old === undefined) return undefined;
        return [{ ...word, deleted_at: null }, ...old];
      });

      if (categoryId !== null) {
        queryClient.setQueryData<CategoryWithWordCount[]>(
          categoriesQueryKey,
          (old) =>
            old?.map((c) =>
              c.id === categoryId ? { ...c, wordCount: c.wordCount + 1 } : c,
            ),
        );
      }

      toast.success(`Word ${word.word} restored successfully`, {
        id: "restore-word",
      });

      return {
        previousDeleted,
        previousByCategory,
        previousRecent,
        previousCategories,
        deletedQueryKey,
        byCategoryQueryKey,
        recentQueryKey,
        categoriesQueryKey,
      };
    },

    onSuccess: (result) => {
      if (result.error) throw new Error(result.error);
    },

    onError: (_, _variables, context) => {
      if (context?.previousDeleted !== undefined)
        queryClient.setQueryData(
          context.deletedQueryKey,
          context.previousDeleted,
        );

      if (context?.previousByCategory !== undefined)
        queryClient.setQueryData(
          context.byCategoryQueryKey,
          context.previousByCategory,
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

      toast.error("Failed to restore word. Please try again.", {
        id: "restore-word",
      });
    },
  });
};
