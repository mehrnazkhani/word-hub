import { queryOptions } from "@tanstack/react-query";
import { getUserSettings } from "./getUserSettings";
import { queryKeys } from "../queries";
import type { SupabaseClient } from "@supabase/supabase-js";

export const userSettingsOptions = (supabase: SupabaseClient, userId: string) =>
  queryOptions({
    queryKey: queryKeys.settings.user(userId),
    queryFn: async () => {
      const { data, error } = await getUserSettings(supabase);
      if (error) throw error;
      return data;
    },
  });
