"use client";

import { useEffect } from "react";

import type { getCategories } from "@/lib/data/getCategories";
import { useCategoriesStore } from "@/stores/categories.store";

type CategoriesStoreInitializerProps = {
  categories: Awaited<ReturnType<typeof getCategories>>;
};

export const CategoriesStoreInitializer = ({
  categories,
}: CategoriesStoreInitializerProps) => {
  const setCategories = useCategoriesStore((state) => state.setCategories);

  useEffect(() => {
    setCategories(categories ?? []);
  }, [categories, setCategories]);

  return null;
};
