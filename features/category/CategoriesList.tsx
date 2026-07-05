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

export const CategoriesList = () => {
  const { data: categories } = useCategories();
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

  return (
    <SidebarMenu className="text-app-secondary flex-1 overflow-y-auto">
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          className="cursor-pointer"
          isActive={optimisticActiveId === "drop"}
        >
          <Link href="/app/drop" onClick={() => setOptimisticActiveId("drop")}>
            <span className="truncate">Drop</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>

      {categories &&
        categories.map((category) => {
          const isActive = optimisticActiveId === String(category.id);

          return (
            <CategoryContextMenu
              key={category.id}
              onRename={() => handleRename(category.id)}
              onExport={() => handleExport(category.id)}
              onDelete={() => handleDelete(category.id)}
            >
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="cursor-pointer"
                  isActive={isActive}
                >
                  <Link
                    href={`/app/${category.id}`}
                    onClick={() => setOptimisticActiveId(String(category.id))}
                  >
                    <span className="truncate">{category.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </CategoryContextMenu>
          );
        })}
    </SidebarMenu>
  );
};
