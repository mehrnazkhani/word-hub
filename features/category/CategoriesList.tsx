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

  // Only used while navigation is in progress.
  const [optimisticActiveId, setOptimisticActiveId] = useState<string | null>(
    null,
  );

  const activeId = optimisticActiveId ?? categoryId ?? null;

  useEffect(() => {
    if (optimisticActiveId === categoryId) {
      setOptimisticActiveId(null);
    }
  }, [categoryId, optimisticActiveId]);

  if (isPending) {
    return <CategorySkeleton />;
  }

  return (
    <SidebarMenu className="text-app-secondary flex-1 overflow-y-auto">
      {categories?.map((category) => {
        const categoryItem = (
          <CategoryMenuItem
            category={category}
            activeId={activeId}
            onNavigate={() => setOptimisticActiveId(String(category.id))}
          />
        );

        if (category.is_system) {
          return <div key={category.id}>{categoryItem}</div>;
        }

        return (
          <CategoryItemContextMenu key={category.id} category={category}>
            {categoryItem}
          </CategoryItemContextMenu>
        );
      })}
    </SidebarMenu>
  );
};

type CategoryMenuItemProps = {
  category: CategoryWithWordCount;
  activeId: string | null;
  onNavigate: () => void;
};

function CategoryMenuItem({
  category,
  activeId,
  onNavigate,
}: CategoryMenuItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className="cursor-pointer"
        isActive={activeId === String(category.id)}
      >
        <Link
          href={ROUTES.CATEGORY(category.id)}
          onClick={onNavigate}
          className="text-accent-foreground/60"
        >
          <span className="truncate">{category.name}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

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
