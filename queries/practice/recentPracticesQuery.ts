"use client";

import { useQuery, queryOptions } from "@tanstack/react-query";
import { useSupabase } from "@/lib/supabase/useSupabase";
import { useUser } from "@/components/providers/user-provider";
import { getRecentPractices } from "./getRecentPractices";
import { queryKeys } from "../queries";
import { SupabaseClient } from "@supabase/supabase-js";

type RecentPracticesQueryProps = {
  supabase: SupabaseClient;
  userId: string;
};

export const recentPracticesQuery = ({
  supabase,
  userId,
}: RecentPracticesQueryProps) =>
  queryOptions({
    queryKey: queryKeys.practice.recent(userId),
    queryFn: async () => {
      const { data, error } = await getRecentPractices({
        client: supabase,
        userId,
      });

      if (error) {
        throw error;
      }

      return data ?? [];
    },
  });

export const useRecentPractices = () => {
  const supabase = useSupabase();
  const { user, isPending } = useUser();

  return useQuery({
    ...recentPracticesQuery({
      supabase,
      userId: user!.id,
    }),
    enabled: !!user && !isPending,
  });
};
