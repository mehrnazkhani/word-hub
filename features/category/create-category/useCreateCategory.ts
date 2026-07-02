"use client";

import { useCategoriesStore } from "@/stores/categories.store";
import { createCategoryAction } from "./createCategory.action";
import type { InsertCategory } from "@/types/db-aliases";

const MAX_CATEGORIES_PER_USER = 20;

export const useCreateCategory = () => {
  const categories = useCategoriesStore((s) => s.categories);
  const addOptimisticCategory = useCategoriesStore(
    (s) => s.addOptimisticCategory,
  );
  const replaceOptimisticCategory = useCategoriesStore(
    (s) => s.replaceOptimisticCategory,
  );
  const removeOptimisticCategory = useCategoriesStore(
    (s) => s.removeOptimisticCategory,
  );

  const createCategory = async (insertData: InsertCategory) => {
    if (categories.length >= MAX_CATEGORIES_PER_USER) {
      return {
        status: "limit_error" as const,
        message: `You can only create up to ${MAX_CATEGORIES_PER_USER} categories.`,
      };
    }

    const normalizedName = insertData.name.trim().toLowerCase();
    const isDuplicate = categories.some(
      (c) => c.name.trim().toLowerCase() === normalizedName,
    );

    if (isDuplicate) {
      return {
        status: "validation_error" as const,
        fieldErrors: {
          name: ["A category with this name already exists."],
        },
      };
    }

    const optimisticId = crypto.randomUUID();

    addOptimisticCategory({
      ...insertData,
      id: 0,
      _optimisticId: optimisticId,
      _status: "pending",
    } as any);

    try {
      const result = await createCategoryAction(insertData);

      if (result.status === "success") {
        replaceOptimisticCategory(optimisticId, result.data as any);
        return result;
      }

      removeOptimisticCategory(optimisticId);
      return result;
    } catch (error) {
      removeOptimisticCategory(optimisticId);
      throw error;
    }
  };

  return { createCategory };
};
