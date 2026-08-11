"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/components/providers/user-provider";
import { queryKeys } from "@/queries/queries";

import { toast } from "sonner";
import { createCategoryAction } from "@/queries/categories/create/createCategory.action";
import { createWordsAction } from "@/queries/words/create/createWordsAction";
import { deleteCategoryAction } from "@/queries/categories/delete/deleteCategory.action";

import type { WordInsertPayload } from "@/schemas/word/word.schema";
import type { Category } from "@/types/db-aliases";

type ImportPayload = {
  category: string;
  words: WordInsertPayload[];
};

export const useImportCategoryMutation = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: async ({ category, words }: ImportPayload) => {
      const categoryResult = await createCategoryAction({ name: category });

      if (categoryResult.status === "validation_error") {
        throw new Error("A category with this name already exists.");
      }
      if (categoryResult.status === "limit_reached") {
        throw new Error(categoryResult.message);
      }
      if (categoryResult.status !== "success" || !categoryResult.data) {
        throw new Error("Failed to create category.");
      }

      const categoryId = categoryResult.data.id;

      const wordsResult = await createWordsAction({
        categoryId,
        words,
        source: "manual",
      });

      if (wordsResult.status !== "success") {
        await deleteCategoryAction({ categoryId });

        if (wordsResult.status === "limit_reached") {
          throw new Error(wordsResult.message);
        }

        throw new Error("Failed to import words. Category was not created.");
      }

      return { category: categoryResult.data, total: words.length };
    },

    onSuccess: ({ category, total }, { category: categoryName }) => {
      const queryKey = queryKeys.category.user(user!.id);
      const wordCountKey = queryKeys.word.count(user!.id);

      queryClient.setQueryData<Category[]>(queryKey, (old) => {
        const systemCategories = (old ?? []).filter((c) => c.is_system);
        const userCategories = (old ?? []).filter((c) => !c.is_system);
        return [...systemCategories, category, ...userCategories];
      });

      queryClient.setQueryData<number | null>(wordCountKey, (old) => {
        return (old ?? 0) + total;
      });

      toast.success(
        `"${categoryName}" imported successfully — ${total} words.`,
      );
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
