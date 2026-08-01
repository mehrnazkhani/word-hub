import type { Category } from "@/types/db-aliases";

export const hasDuplicateCategoryName = (
  name: string,
  categories: Category[],
  excludeCategoryId?: Category["id"],
) => {
  const normalizedName = name.trim().toLowerCase();

  return categories.some(
    (category) =>
      category.id !== excludeCategoryId &&
      category.name.trim().toLowerCase() === normalizedName,
  );
};
