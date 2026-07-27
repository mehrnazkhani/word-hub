"use client";

import { useQuery, queryOptions } from "@tanstack/react-query";
import { useSupabase } from "@/lib/supabase/useSupabase";
import { useUser } from "@/components/providers/user-provider";
import { getUserCategories } from "./getCategories";
import { queryKeys } from "../queries";
import { SupabaseClient } from "@supabase/supabase-js";

type CategoriesQueryProps = {
  supabase: SupabaseClient;
  userId: string;
};

export const categoriesQuery = ({ supabase, userId }: CategoriesQueryProps) =>
  queryOptions({
    queryKey: queryKeys.category.user(userId),
    queryFn: async () => {
      const { data, error } = await getUserCategories(supabase, userId);
      if (error) throw error;
      return data;
    },
  });

export const useUserCategories = () => {
  const supabase = useSupabase();
  const { user, isPending } = useUser();

  return useQuery({
    ...categoriesQuery({ supabase, userId: user!.id }),
    enabled: !!user && !isPending,
  });
};
