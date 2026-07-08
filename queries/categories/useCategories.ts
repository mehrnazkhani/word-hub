"use client";

import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "@/lib/supabase/useSupabase";
import { useUser } from "@/components/providers/user-provider";
import { getUserCategories } from "./getCategories";
import { queryKeys } from "../queries";

export const useUserCategories = () => {
  const supabase = useSupabase();
  const { user, isPending } = useUser();

  return useQuery({
    queryKey: queryKeys.category.user(user?.id),
    enabled: !!user && !isPending,

    queryFn: async () => {
      console.log("fetching user categories for:", user!.id);
      const { data, error } = await getUserCategories(supabase, user!.id);
      if (error) throw error;
      return data;
    },
  });
};
