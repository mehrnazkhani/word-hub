"use client";

import { ReactNode, useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import type { Category } from "@/types/db-aliases";
import {
  CategoryContextMenuContext,
  type DialogType,
} from "./CategoryContextMenuContext";
import { ExportCategory } from "./items/ExportCategory";
import { RenameCategory } from "./items/RenameCategory";
import { DeleteCategory } from "./items/DeleteCategory";
import { RenameCategoryDialog } from "@/features/context-menu/category/dialogs/RenameCategoryDialog";

type CategoryContextMenuProps = {
  category: Category;
  children: ReactNode;
};

const CategoryContextMenuRoot = ({
  category,
  children,
}: CategoryContextMenuProps) => {
  const [dialog, setDialog] = useState<DialogType>(null);

  return (
    <CategoryContextMenuContext.Provider value={{ category, setDialog }}>
      <ContextMenu>{children}</ContextMenu>

      <RenameCategoryDialog
        category={category}
        open={dialog === "rename"}
        onOpenChange={(open) => setDialog(open ? "rename" : null)}
      />
    </CategoryContextMenuContext.Provider>
  );
};

const Content = ({ children }: { children: ReactNode }) => (
  <ContextMenuContent className="p-2">{children}</ContextMenuContent>
);

export const CategoryContextMenu = Object.assign(CategoryContextMenuRoot, {
  Content,
  Separator: ContextMenuSeparator,
  Trigger: ContextMenuTrigger,
  Export: ExportCategory,
  Rename: RenameCategory,
  Delete: DeleteCategory,
});
