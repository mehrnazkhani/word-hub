import { queryOptions } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";

import { categoriesQuery } from "./useCategories";

type CategoryByIdQueryOptionsProps = {
  supabase: SupabaseClient;
  userId: string;
  categoryId: number;
};

export const categoryByIdQueryOptions = ({
  supabase,
  userId,
  categoryId,
}: CategoryByIdQueryOptionsProps) =>
  queryOptions({
    ...categoriesQuery({ supabase, userId }),
    select: (categories) =>
      categories.find((category) => category.id === categoryId) ?? null,
  });
