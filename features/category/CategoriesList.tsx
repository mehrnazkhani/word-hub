"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CategoryContextMenu } from "./CategoryContextMenu";
import { useCategoriesStore } from "@/stores/categories.store";

export const CategoriesList = () => {
  const categories = useCategoriesStore((state) => state.categories);
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

      {categories.map((category) => {
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
