"use client";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { useCategoryById } from "@/queries/categories/useCategoryById";

const useCategoryTitle = () => {
  const pathname = usePathname();
  const match = pathname.match(/^\/app\/(\d+)/);
  const categoryId = match ? parseInt(match[1]) : undefined;

  const { category } = useCategoryById(categoryId);

  return category?.name;
};

export const usePageTitle = () => {
  const pathname = usePathname();
  const categoryTitle = useCategoryTitle();

  if (pathname === ROUTES.TRASH) return "Trash";
  if (pathname === ROUTES.RECENT) return "Recent";
  if (pathname.match(/^\/app\/(\d+)/)) return categoryTitle ?? "";

  return "";
};
