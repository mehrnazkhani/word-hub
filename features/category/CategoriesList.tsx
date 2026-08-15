"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useUserCategories } from "@/queries/categories/useCategories";
import { CategorySkeleton } from "./CategorySkeleton";
import { CategoryContextMenu } from "@/features/context-menu/category/CategoryContextMenu";
import { ROUTES } from "@/constants/routes";
import type { CategoryWithWordCount } from "@/types/db-aliases";

export const CategoriesList = () => {
  const { data: categories, isPending } = useUserCategories();
  const { categoryId } = useParams<{ categoryId?: string }>();

  const [optimisticActiveId, setOptimisticActiveId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    setOptimisticActiveId(categoryId || null);
  }, [categoryId]);

  if (isPending) {
    return <CategorySkeleton />;
  }

  return (
    <SidebarMenu className="text-app-secondary flex-1 overflow-y-auto">
      {categories?.map((category) => {
        const menuButton = (
          <SidebarMenuItem key={category.id}>
            <SidebarMenuButton
              asChild
              className="cursor-pointer"
              isActive={optimisticActiveId === String(category.id)}
            >
              <Link
                href={ROUTES.CATEGORY(category.id)}
                onClick={() => setOptimisticActiveId(String(category.id))}
                className="text-accent-foreground/60"
              >
                <span className="truncate">{category.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );

        if (category.is_system) {
          return menuButton;
        }

        return (
          <CategoryItemContextMenu key={category.id} category={category}>
            {menuButton}
          </CategoryItemContextMenu>
        );
      })}
    </SidebarMenu>
  );
};

type CategoryItemContextMenuProps = {
  category: CategoryWithWordCount;
  children: React.ReactNode;
};

function CategoryItemContextMenu({
  category,
  children,
}: CategoryItemContextMenuProps) {
  return (
    <CategoryContextMenu category={category}>
      <CategoryContextMenu.Trigger asChild>
        {children}
      </CategoryContextMenu.Trigger>

      <CategoryContextMenu.Content>
        <CategoryContextMenu.Rename />
        <CategoryContextMenu.Export />
        <CategoryContextMenu.Separator />
        <CategoryContextMenu.Delete />
      </CategoryContextMenu.Content>
    </CategoryContextMenu>
  );
}
