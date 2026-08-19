import { queryOptions, useQuery } from "@tanstack/react-query";
import { useSupabase } from "@/lib/supabase/useSupabase";
import { useUser } from "@/components/providers/user-provider";
import { getUserWordsScore } from "./getUserWordsScore";
import { queryKeys } from "@/queries/queries";
import type { SupabaseClient } from "@supabase/supabase-js";

export const userWordsScoreQuery = (supabase: SupabaseClient, userId: string) =>
  queryOptions({
    queryKey: queryKeys.word.score(userId),
    queryFn: () =>
      getUserWordsScore({
        client: supabase,
        userId,
      }),
  });

export const useUserWordsScore = () => {
  const supabase = useSupabase();
  const { user, isPending } = useUser();

  return useQuery({
    ...userWordsScoreQuery(supabase, user!.id),
    enabled: !!user && !isPending,
  });
};
