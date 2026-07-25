"use client";

import { ReactNode } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import type { Category } from "@/types/db-aliases";

import { CategoryContextMenuContext } from "./CategoryContextMenuContext";
import { ExportCategory } from "./items/ExportCategory";

type CategoryContextMenuProps = {
  category: Category;
  children: ReactNode;
};

const CategoryContextMenuRoot = ({
  category,
  children,
}: CategoryContextMenuProps) => {
  return (
    <CategoryContextMenuContext.Provider value={{ category }}>
      <ContextMenu>{children}</ContextMenu>
    </CategoryContextMenuContext.Provider>
  );
};

const Content = ({ children }: { children: ReactNode }) => (
  <ContextMenuContent className="p-2">{children}</ContextMenuContent>
);

export const CategoryContextMenu = Object.assign(CategoryContextMenuRoot, {
  Separator: ContextMenuSeparator,
  Trigger: ContextMenuTrigger,
  Export: ExportCategory,
  Content,
});
