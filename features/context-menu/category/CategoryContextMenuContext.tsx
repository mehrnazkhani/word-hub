import { createContext, useContext } from "react";
import type { Category } from "@/types/db-aliases";

export type DialogType = "rename" | "delete" | null;

type CategoryContextMenuContextValue = {
  category: Category;
  setDialog: (dialog: DialogType) => void;
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
