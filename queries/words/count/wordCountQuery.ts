import { QueryClient } from "@tanstack/react-query";
import { getWordsCount } from "../getWords";
import { queryKeys } from "@/queries/queries";
import type { SupabaseClient } from "@supabase/supabase-js";

export const wordCountQuery = (supabase: SupabaseClient, userId: string) => ({
  queryKey: queryKeys.word.count(userId),
  queryFn: async () => {
    const { count, error } = await getWordsCount({
      client: supabase,
      userId: userId,
    });
    if (error) throw error;
    return count;
  },
});

export const prefetchWordCount = async (
  queryClient: QueryClient,
  supabase: SupabaseClient,
  userId: string,
) => {
  await queryClient.prefetchQuery(wordCountQuery(supabase, userId));
};
