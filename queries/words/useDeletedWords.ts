"use client";

import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "@/lib/supabase/useSupabase";
import { useUser } from "@/components/providers/user-provider";
import { getDeletedWords } from "./getWords";
import { queryKeys } from "@/queries/queries";

export const useDeletedWords = () => {
  const supabase = useSupabase();
  const { user, isPending } = useUser();

  return useQuery({
    queryKey: queryKeys.word.deleted(user!.id),
    enabled: !!user && !isPending,

    queryFn: async () => {
      const { data, error } = await getDeletedWords({
        client: supabase,
        userId: user!.id,
      });
      if (error) throw error;
      return data;
    },
  });
};
