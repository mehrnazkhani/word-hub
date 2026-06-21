"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getCategories } from "@/lib/data/getCategories";

type CategoriesListProps = {
  categories: Awaited<ReturnType<typeof getCategories>>;
};

export const CategoriesList = ({ categories }: CategoriesListProps) => {
  const pathname = usePathname();

  const currentId = pathname.startsWith("/app/")
    ? Number(pathname.split("/")[2])
    : null;

  const [activeId, setActiveId] = useState<number | null>(currentId);

  useEffect(() => {
    setActiveId(currentId);
  }, [currentId]);

  return (
    <SidebarMenu className="text-app-secondary flex-1 overflow-y-auto">
      {categories?.map((category) => {
        const isActive = activeId === category.id;

        return (
          <SidebarMenuItem key={category.id}>
            <SidebarMenuButton
              asChild
              className="cursor-pointer"
              isActive={isActive}
            >
              <Link
                href={`/app/${category.id}`}
                onClick={() => {
                  setActiveId(category.id);
                }}
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
