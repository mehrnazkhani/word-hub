"use client";

import { useQuery, queryOptions } from "@tanstack/react-query";
import { useSupabase } from "@/lib/supabase/useSupabase";
import { useUser } from "@/components/providers/user-provider";
import { getActiveWords } from "./getWords";
import { queryKeys } from "../queries";
import { SupabaseClient } from "@supabase/supabase-js";

type ActiveWordsQueryProps = {
  supabase: SupabaseClient;
  userId: string;
  categoryId: number;
};

export const activeWordsQuery = ({
  supabase,
  userId,
  categoryId,
}: ActiveWordsQueryProps) =>
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
    ...activeWordsQuery({ supabase, userId: user!.id, categoryId }),
    enabled: !!user && !isPending,
  });
};
