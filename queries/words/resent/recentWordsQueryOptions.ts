import { queryOptions } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";

import { getRecentWords } from "../getWords";
import { queryKeys } from "@/queries/queries";

type RecentWordsQueryOptionsProps = {
  supabase: SupabaseClient;
  userId: string;
  limit: number;
};

export const recentWordsQueryOptions = ({
  supabase,
  userId,
  limit,
}: RecentWordsQueryOptionsProps) =>
  queryOptions({
    queryKey: queryKeys.word.recent(userId),
    queryFn: async () => {
      const { data, error } = await getRecentWords({
        client: supabase,
        userId,
        limit,
      });

      if (error) throw error;
      return data;
    },
  });
