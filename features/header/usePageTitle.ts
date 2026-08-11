"use client";

import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { useCategoryById } from "@/queries/categories/useCategoryById";
import { useCategoryWordCount } from "@/queries/words/count/useCategoryWordCount";

const useCategoryTitle = () => {
  const pathname = usePathname();
  const match = pathname.match(/^\/app\/(\d+)/);
  const categoryId = match ? parseInt(match[1]) : undefined;

  const { category } = useCategoryById(categoryId);
  const wordCount = useCategoryWordCount(categoryId);

  return { name: category?.name, wordCount };
};

export const usePageTitle = () => {
  const pathname = usePathname();
  const { name, wordCount } = useCategoryTitle();

  if (pathname === ROUTES.TRASH) return { name: "Trash" };
  if (pathname === ROUTES.RECENT) return { name: "Recent" };
  if (pathname.match(/^\/app\/(\d+)/)) return { name: name ?? "", wordCount };

  return { name: "" };
};
