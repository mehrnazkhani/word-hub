import { createContext, useContext } from "react";
import type { Category } from "@/types/db-aliases";

type CategoryContextMenuContextValue = {
  category: Category;
};

export const CategoryContextMenuContext =
  createContext<CategoryContextMenuContextValue | null>(null);

export const useCategoryContextMenu = () => {
  const ctx = useContext(CategoryContextMenuContext);
  if (!ctx)
    throw new Error(
      "useCategoryContextMenu must be used inside CategoryContextMenu",
    );
  return ctx;
};
