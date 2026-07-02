"use client";
import { useCategoriesStore } from "@/stores/categories.store";
import { createCategoryAction } from "./createCategory.action";
import type { InsertCategory } from "@/types/db-aliases";

export const useCreateCategory = () => {
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
    const optimisticId = crypto.randomUUID();

    addOptimisticCategory({
      ...insertData,
      id: 0,
      _optimisticId: optimisticId,
      _status: "pending",
    } as any);

    try {
      const result = await createCategoryAction(insertData);

      if (
        result &&
        "status" in result &&
        result.status === "validation_error"
      ) {
        removeOptimisticCategory(optimisticId);
        return result;
      }

      replaceOptimisticCategory(optimisticId, result as any);
      return result;
    } catch (error) {
      removeOptimisticCategory(optimisticId);
      throw error;
    }
  };

  return { createCategory };
};
