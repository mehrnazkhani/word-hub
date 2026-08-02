import { useUserCategories } from "./useCategories";

export const useCategoryById = (id: number | string | null | undefined) => {
  const { data: categories, isPending } = useUserCategories();
  const category =
    id != null ? (categories?.find((c) => c.id === Number(id)) ?? null) : null;

  return { category, isPending };
};
