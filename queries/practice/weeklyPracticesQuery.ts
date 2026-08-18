import { queryOptions, useQuery } from "@tanstack/react-query";
import { useSupabase } from "@/lib/supabase/useSupabase";
import { useUser } from "@/components/providers/user-provider";
import { getWeeklyPractices } from "./getWeeklyPractices";
import { queryKeys } from "../queries";

export const weeklyPracticesQuery = (
  supabase: ReturnType<typeof useSupabase>,
  userId: string,
) =>
  queryOptions({
    queryKey: queryKeys.practice.weekly(userId),
    queryFn: () =>
      getWeeklyPractices({
        client: supabase,
        userId,
      }),
  });

export const useWeeklyPractices = () => {
  const supabase = useSupabase();
  const { user } = useUser();

  return useQuery({
    ...weeklyPracticesQuery(supabase, user!.id),
    enabled: !!user,
  });
};
