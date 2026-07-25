"use client";

import { WordContextMenu } from "@/features/context-menu/WordContextMenu";
import type { Category } from "@/types/db-aliases";
import { CategoryContextMenu } from "@/features/context-menu/category/CategoryContextMenu";

type CategoryListContextMenuProps = {
  category: Category;
  children: React.ReactNode;
};

export const CategoryListContextMenu = ({
  category,
  children,
}: CategoryListContextMenuProps) => {
  return (
    <CategoryContextMenu category={category}>
      <CategoryContextMenu.Trigger asChild>
        {children}
      </CategoryContextMenu.Trigger>
      <CategoryContextMenu.Content>
        <CategoryContextMenu.Export />
        <CategoryContextMenu.Separator />
      </CategoryContextMenu.Content>
    </CategoryContextMenu>
  );
};
