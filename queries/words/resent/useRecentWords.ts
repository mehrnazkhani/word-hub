"use client";

import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "@/lib/supabase/useSupabase";
import { useUser } from "@/components/providers/user-provider";
import { recentWordsQueryOptions } from "./recentWordsQueryOptions";

type RecentWordsProps = {
  limit: number;
};

export const useRecentWords = ({ limit }: RecentWordsProps) => {
  const supabase = useSupabase();
  const { user } = useUser();

  return useQuery({
    ...recentWordsQueryOptions({
      supabase,
      userId: user!.id,
      limit,
    }),
    enabled: !!user,
  });
};
