"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { forwardRef, useTransition, useOptimistic } from "react";
import { Pin } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useUserCategories } from "@/queries/categories/useCategories";
import { CategorySkeleton } from "./CategorySkeleton";
import { CategoryContextMenu } from "@/features/context-menu/category/CategoryContextMenu";
import { useCloseMobileSidebar } from "@/hooks/useCloseMobileSidebar";
import { ROUTES } from "@/constants/routes";
import type { CategoryWithWordCount } from "@/types/db-aliases";

export const CategoriesList = () => {
  const { data: categories, isPending } = useUserCategories();
  const { categoryId } = useParams<{ categoryId?: string }>();
  const closeSidebar = useCloseMobileSidebar();
  const router = useRouter();

  const [activeId, setOptimisticId] = useOptimistic(categoryId ?? null);
  const [, startTransition] = useTransition();

  const handleNavigate = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: CategoryWithWordCount["id"],
  ) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
      return;

    e.preventDefault();
    closeSidebar();
    startTransition(() => {
      setOptimisticId(String(id));
      router.push(ROUTES.CATEGORY(id));
    });
  };

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
            onNavigate={(e) => handleNavigate(e, category.id)}
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
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

const CategoryMenuItem = forwardRef<
  React.ElementRef<typeof SidebarMenuItem>,
  CategoryMenuItemProps &
    Omit<React.ComponentPropsWithoutRef<typeof SidebarMenuItem>, "children">
>(function CategoryMenuItem({ category, activeId, onNavigate, ...props }, ref) {
  return (
    <SidebarMenuItem ref={ref} {...props}>
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
          <span className="min-w-0 truncate">{category.name}</span>
          {category.is_system && (
            <Pin
              aria-hidden="true"
              className="ml-auto text-accent-foreground/40"
            />
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
});

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
