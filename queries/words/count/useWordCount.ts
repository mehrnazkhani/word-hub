"use client";

import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "@/lib/supabase/useSupabase";
import { useUser } from "@/components/providers/user-provider";
import { getActiveWordsCount } from "@/queries/words/getWords";
import { queryKeys } from "@/queries/queries";

export const useWordCount = () => {
  const supabase = useSupabase();
  const { user, isPending } = useUser();

  return useQuery({
    queryKey: queryKeys.word.count(user!.id),
    enabled: !!user && !isPending,

    queryFn: async () => {
      const { count, error } = await getActiveWordsCount({
        client: supabase,
        userId: user!.id,
      });

      if (error) throw error;

      return { wordCount: count ?? null };
    },
  });
};
