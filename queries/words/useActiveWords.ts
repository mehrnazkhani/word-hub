"use client";

import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "@/lib/supabase/useSupabase";
import { useUser } from "@/components/providers/user-provider";
import { activeWordsQueryOptions } from "./activeWordsQueryOptions";

export const useActiveWords = (categoryId: number) => {
  const supabase = useSupabase();
  const { user } = useUser();

  return useQuery({
    ...activeWordsQueryOptions({
      supabase,
      userId: user!.id,
      categoryId,
    }),
    enabled: !!user,
  });
};
