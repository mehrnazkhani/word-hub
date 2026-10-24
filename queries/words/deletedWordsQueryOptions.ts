import { queryOptions } from "@tanstack/react-query";
import type { SupabaseClient } from "@supabase/supabase-js";

import { getDeletedWords } from "./getWords";
import { queryKeys } from "../queries";

type DeletedWordsQueryOptionsProps = {
  supabase: SupabaseClient;
  userId: string;
};

export const deletedWordsQueryOptions = ({
  supabase,
  userId,
}: DeletedWordsQueryOptionsProps) =>
  queryOptions({
    queryKey: queryKeys.word.deleted(userId),
    queryFn: async () => {
      const { data, error } = await getDeletedWords({
        client: supabase,
        userId,
      });
      if (error) throw error;
      return data;
    },
  });
