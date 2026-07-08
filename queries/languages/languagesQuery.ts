import { queryKeys } from "../queries";
import { getLanguages } from "./getLanguages";
import type { SupabaseClient } from "@supabase/supabase-js";

export const languagesQuery = (supabase: SupabaseClient) => ({
  queryKey: queryKeys.language.all,

  queryFn: async () => {
    const { data, error } = await getLanguages(supabase);
    if (error) throw error;
    return data;
  },
});
