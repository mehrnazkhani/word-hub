"use client";

import { usePathname } from "next/navigation";
import { useCategoryById } from "@/queries/categories/useCategoryById";
import { useDeletedWords } from "@/queries/words/useDeletedWords";
import { ROUTES } from "@/constants/routes";

const useCategoryTitle = () => {
  const pathname = usePathname();
  const match = pathname.match(/^\/app\/(\d+)/);
  const categoryId = match ? parseInt(match[1]) : undefined;

  const { category } = useCategoryById(categoryId);

  return { name: category?.name, wordCount: category?.wordCount };
};

export const usePageTitle = () => {
  const pathname = usePathname();
  const { name, wordCount } = useCategoryTitle();
  const { data: deletedWords } = useDeletedWords();

  if (pathname === ROUTES.PRACTICE) return { name: "Practice", isTrash: false };
  if (pathname === ROUTES.RECENT) return { name: "Recent", isTrash: false };
  if (pathname === ROUTES.TRASH)
    return { name: "Trash", wordCount: deletedWords?.length, isTrash: true };
  if (pathname.match(/^\/app\/(\d+)/))
    return { name: name ?? "", wordCount, isTrash: false };

  return { name: "", isTrash: false };
};
