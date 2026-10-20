"use client";

import { useQuery, queryOptions } from "@tanstack/react-query";
import { useSupabase } from "@/lib/supabase/useSupabase";
import { useUser } from "@/components/providers/user-provider";
import { getUserCategories } from "./getCategories";
import { queryKeys } from "../queries";
import { UNCATEGORIZED_CATEGORY_NAME } from "@/constants/categories";
import type { SupabaseClient } from "@supabase/supabase-js";

type CategoriesQueryProps = {
  supabase: SupabaseClient;
  userId: string;
};

export const categoriesQuery = ({ supabase, userId }: CategoriesQueryProps) =>
  queryOptions({
    queryKey: queryKeys.category.user(userId),
    queryFn: () => getUserCategories(supabase, userId),
  });

export const useUserCategories = () => {
  const supabase = useSupabase();
  const { user } = useUser();

  return useQuery({
    ...categoriesQuery({ supabase, userId: user!.id }),
    enabled: !!user,
    select: (data) => {
      if (!data) return data;

      const system = data.filter((c) => c.is_system);
      const user = data.filter((c) => !c.is_system);

      const uncategorized = system.filter(
        (c) => c.name === UNCATEGORIZED_CATEGORY_NAME,
      );
      const otherSystem = system.filter(
        (c) => c.name !== UNCATEGORIZED_CATEGORY_NAME,
      );

      return [...uncategorized, ...otherSystem, ...user];
    },
  });
};
