import { QueryClient } from "@tanstack/react-query";
import { languagesQuery } from "./languagesQuery";
import type { SupabaseClient } from "@supabase/supabase-js";

export const prefetchLanguages = async (
  queryClient: QueryClient,
  supabase: SupabaseClient,
) => {
  await queryClient.prefetchQuery(languagesQuery(supabase));
};
