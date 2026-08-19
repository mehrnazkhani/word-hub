"use client";

import { useQuery, queryOptions } from "@tanstack/react-query";
import { useSupabase } from "@/lib/supabase/useSupabase";
import { useUser } from "@/components/providers/user-provider";
import { getUserCategories } from "./getCategories";
import { queryKeys } from "../queries";
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
  const { user, isPending } = useUser();

  return useQuery({
    ...categoriesQuery({ supabase, userId: user!.id }),
    enabled: !!user && !isPending,
    select: (data) => {
      if (!data) return data;
      const system = data.filter((c) => c.is_system);
      const user = data.filter((c) => !c.is_system);
      return [...system, ...user];
    },
  });
};
