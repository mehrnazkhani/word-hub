import { QueryClient } from "@tanstack/react-query";
import { userSettingsOptions } from "./userSettingsOptions";
import type { SupabaseClient } from "@supabase/supabase-js";

export const prefetchUserSettings = async (
  queryClient: QueryClient,
  supabase: SupabaseClient,
  userId: string,
) => {
  await queryClient.prefetchQuery(userSettingsOptions(supabase, userId));
};
