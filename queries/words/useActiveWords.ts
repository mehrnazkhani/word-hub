"use client";

import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "@/lib/supabase/useSupabase";
import { useUser } from "@/components/providers/user-provider";
import { getActiveWords } from "./getWords";
import { queryKeys } from "../queries";

export const useActiveWords = (categoryId: number) => {
  const supabase = useSupabase();
  const { user, isPending } = useUser();

  return useQuery({
    queryKey: queryKeys.word.byCategoryId(categoryId, user!.id),
    enabled: !!user && !isPending,

    queryFn: async () => {
      const { data, error } = await getActiveWords({
        client: supabase,
        userId: user!.id,
        categoryId,
      });
      if (error) throw error;
      return data;
    },
  });
};
