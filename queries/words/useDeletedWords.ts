"use client";

import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "@/lib/supabase/useSupabase";
import { useUser } from "@/components/providers/user-provider";
import { deletedWordsQueryOptions } from "./deletedWordsQueryOptions";

export const useDeletedWords = () => {
  const supabase = useSupabase();
  const { user } = useUser();

  return useQuery({
    ...deletedWordsQueryOptions({
      supabase,
      userId: user!.id,
    }),
    enabled: !!user,
  });
};
