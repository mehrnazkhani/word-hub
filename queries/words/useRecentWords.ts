"use client";

import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "@/lib/supabase/useSupabase";
import { useUser } from "@/components/providers/user-provider";
import { getRecentWords } from "./getWords";
import { queryKeys } from "../queries";

type RecentWordsProps = {
  limit: number;
};

export const useRecentWords = ({ limit }: RecentWordsProps) => {
  const supabase = useSupabase();
  const { user, isPending } = useUser();

  return useQuery({
    queryKey: queryKeys.word.recent(user!.id),
    enabled: !!user && !isPending,

    queryFn: async () => {
      const { data, error } = await getRecentWords({
        client: supabase,
        userId: user!.id,
        limit,
      });

      if (error) throw error;
      return data;
    },
  });
};
