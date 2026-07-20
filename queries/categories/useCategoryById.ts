"use client";

import { findObjectById } from "@/lib/utils/findObjectById";
import { useUserCategories } from "./useCategories";

export const useCategoryById = (categoryId?: number | null) => {
  const { data: categories = [] } = useUserCategories();

  return {
    category: findObjectById(categories, categoryId),
  };
};
