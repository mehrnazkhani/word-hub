import { queryOptions, useQuery } from "@tanstack/react-query";
import { useSupabase } from "@/lib/supabase/useSupabase";
import { useUser } from "@/components/providers/user-provider";
import { getUserWordsScore } from "./getUserWordsScore";
import { queryKeys } from "@/queries/queries";

export const userWordsScoreQuery = (
  supabase: ReturnType<typeof useSupabase>,
  userId: string,
) =>
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
  const { user } = useUser();

  return useQuery({
    ...userWordsScoreQuery(supabase, user!.id),
    enabled: !!user,
  });
};
