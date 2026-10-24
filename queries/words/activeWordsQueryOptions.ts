import { queryOptions } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";

import { getActiveWords } from "./getWords";
import { queryKeys } from "../queries";

type ActiveWordsQueryOptionsProps = {
  supabase: SupabaseClient;
  userId: string;
  categoryId: number;
};

export const activeWordsQueryOptions = ({
  supabase,
  userId,
  categoryId,
}: ActiveWordsQueryOptionsProps) =>
  queryOptions({
    queryKey: queryKeys.word.byCategoryId(categoryId, userId),
    queryFn: async () => {
      const { data, error } = await getActiveWords({
        client: supabase,
        userId,
        categoryId,
      });
      if (error) throw error;
      return data;
    },
  });
