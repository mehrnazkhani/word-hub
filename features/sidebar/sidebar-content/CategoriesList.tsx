"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useCategoriesStore } from "@/stores/categories.store";

export const CategoriesList = () => {
  const categories = useCategoriesStore((state) => state.categories);
  const { categoryId } = useParams<{ categoryId?: string }>();

  const idFromUrl = Number(categoryId);

  const [optimisticActiveId, setOptimisticActiveId] = useState<number | null>(
    Number.isNaN(idFromUrl) ? null : idFromUrl,
  );

  useEffect(() => {
    setOptimisticActiveId(Number.isNaN(idFromUrl) ? null : idFromUrl);
  }, [idFromUrl]);

  return (
    <SidebarMenu className="text-app-secondary flex-1 overflow-y-auto">
      {categories.map((category) => {
        const isActive = optimisticActiveId === category.id;

        return (
          <SidebarMenuItem key={category.id}>
            <SidebarMenuButton
              asChild
              className="cursor-pointer"
              isActive={isActive}
            >
              <Link
                href={`/app/${category.id}`}
                onClick={() => setOptimisticActiveId(category.id)}
              >
                <span className="truncate">{category.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
};
