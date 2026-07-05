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
import { useCategories } from "@/queries/categories/useCategories";
import { CategorySkeleton } from "./CategorySkeleton";

export const CategoriesList = () => {
  const { data: categories, isPending } = useCategories();
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
          const isDrop = category.id === null;
          const activeKey = isDrop ? "Drop" : String(category.id);
          const isActive = optimisticActiveId === activeKey;

          const menuButton = (
            <SidebarMenuItem key={activeKey}>
              <SidebarMenuButton
                asChild
                className="cursor-pointer"
                isActive={isActive}
              >
                <Link
                  href={getCategoryPath(category.id)}
                  onClick={() => setOptimisticActiveId(String(category.id))}
                >
                  <span className="truncate">{category.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );

          if (isDrop) return menuButton;

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

export function getCategoryPath(id: number | null) {
  return id === null ? "/app/drop" : `/app/${id}`;
}
