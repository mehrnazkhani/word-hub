"use client";

import { useUserCategories } from "@/queries/categories/useCategories";

export const useCategoryCount = () => {
  const { data: categories } = useUserCategories();
  return categories?.length ?? 0;
};
