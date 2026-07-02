import { create } from "zustand";
import type { getCategories } from "@/lib/data/getCategories";

type Categories = Awaited<ReturnType<typeof getCategories>>;
export type Category = NonNullable<Categories>[number];

export type OptimisticCategory = Category & {
  _optimisticId?: string;
  _status?: "pending" | "error";
};

type CategoriesStore = {
  categories: OptimisticCategory[];
  setCategories: (categories: Category[]) => void;

  addOptimisticCategory: (category: OptimisticCategory) => void;
  replaceOptimisticCategory: (optimisticId: string, category: Category) => void;
  markOptimisticError: (optimisticId: string) => void;
  removeOptimisticCategory: (optimisticId: string) => void;

  updateCategory: (id: Category["id"], patch: Partial<Category>) => void;
  deleteCategory: (id: Category["id"]) => void;
};

export const useCategoriesStore = create<CategoriesStore>((set) => ({
  categories: [],

  setCategories: (categories) => set({ categories }),

  addOptimisticCategory: (category) =>
    set((state) => ({ categories: [category, ...state.categories] })),

  replaceOptimisticCategory: (optimisticId, category) =>
    set((state) => ({
      categories: state.categories.map((c) =>
        c._optimisticId === optimisticId ? category : c,
      ),
    })),

  markOptimisticError: (optimisticId) =>
    set((state) => ({
      categories: state.categories.map((c) =>
        c._optimisticId === optimisticId ? { ...c, _status: "error" } : c,
      ),
    })),

  removeOptimisticCategory: (optimisticId) =>
    set((state) => ({
      categories: state.categories.filter(
        (c) => c._optimisticId !== optimisticId,
      ),
    })),

  updateCategory: (id, patch) =>
    set((state) => ({
      categories: state.categories.map((c) =>
        c.id === id ? { ...c, ...patch } : c,
      ),
    })),

  deleteCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((c) => c.id !== id),
    })),
}));
