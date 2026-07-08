"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CategoryContextMenu } from "./CategoryContextMenu";
import { useUserCategories } from "@/queries/categories/useCategories";
import { CategorySkeleton } from "./CategorySkeleton";

export const CategoriesList = () => {
  const { data: categories, isPending } = useUserCategories();
  const { categoryId } = useParams<{ categoryId?: string }>();

  const [optimisticActiveId, setOptimisticActiveId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    setOptimisticActiveId(categoryId || null);
  }, [categoryId]);

  const handleRename = (categoryId: number) => {
    console.log("Rename category:", categoryId);
  };
  const handleExport = (categoryId: number) => {
    console.log("Export category:", categoryId);
  };
  const handleDelete = (categoryId: number) => {
    console.log("Delete category:", categoryId);
  };

  if (isPending) {
    return <CategorySkeleton />;
  }

  return (
    <SidebarMenu className="text-app-secondary flex-1 overflow-y-auto">
      {categories &&
        categories.map((category) => {
          const menuButton = (
            <SidebarMenuItem key={category.id}>
              <SidebarMenuButton
                asChild
                className="cursor-pointer"
                isActive={optimisticActiveId === String(category.id)}
              >
                <Link
                  href={`/app/${category.id}`}
                  onClick={() => setOptimisticActiveId(String(category.id))}
                >
                  <span className="truncate">{category.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );

          if (category.is_system) return menuButton;

          return (
            <CategoryContextMenu
              key={category.id}
              onRename={() => handleRename(category.id)}
              onExport={() => handleExport(category.id)}
              onDelete={() => handleDelete(category.id)}
            >
              {menuButton}
            </CategoryContextMenu>
          );
        })}
    </SidebarMenu>
  );
};
