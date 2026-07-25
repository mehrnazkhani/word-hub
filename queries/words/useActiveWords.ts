"use client";

import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "@/lib/supabase/useSupabase";
import { useUser } from "@/components/providers/user-provider";
import { getActiveWords } from "./getWords";
import { queryKeys } from "../queries";
import { SupabaseClient } from "@supabase/supabase-js";
import { queryOptions } from "@tanstack/react-query";

export const activeWordsQueryOptions = (
  categoryId: number,
  userId: string,
  supabase: SupabaseClient,
) =>
  queryOptions({
    queryKey: queryKeys.word.byCategoryId(categoryId, userId),
    queryFn: async () => {
      const { data, error } = await getActiveWords({
        client: supabase,
        userId,
        categoryId,
      });
      if (error) throw error;
      return data;
    },
  });

export const useActiveWords = (categoryId: number) => {
  const supabase = useSupabase();
  const { user, isPending } = useUser();

  return useQuery({
    ...activeWordsQueryOptions(categoryId, user!.id, supabase),
    enabled: !!user && !isPending,
  });
};
