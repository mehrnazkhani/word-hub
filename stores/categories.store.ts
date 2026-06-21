import { create } from "zustand";

import type { getCategories } from "@/lib/data/getCategories";

type categories = Awaited<ReturnType<typeof getCategories>>;
type Category = NonNullable<categories>[number];

type CategoriesStore = {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
};

export const useCategoriesStore = create<CategoriesStore>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
}));
