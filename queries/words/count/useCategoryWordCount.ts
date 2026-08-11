"use client";

import { useSupabase } from "@/lib/supabase/useSupabase";
import { useUser } from "@/components/providers/user-provider";
import { activeWordsQuery } from "@/queries/words/useActiveWords";
import { useQuery } from "@tanstack/react-query";

export const useCategoryWordCount = (categoryId: number | undefined) => {
  const supabase = useSupabase();
  const { user } = useUser();

  const { data: wordCount } = useQuery({
    ...activeWordsQuery({
      supabase,
      userId: user!.id,
      categoryId: categoryId!,
    }),
    enabled: !!user && !!categoryId,
    select: (data) => data?.length,
  });

  return wordCount;
};
