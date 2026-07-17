import { queryOptions } from "@tanstack/react-query";
import { getUserSettings } from "./getUserSettings";
import type { SupabaseClient } from "@supabase/supabase-js";

export const userSettingsOptions = (supabase: SupabaseClient, userId: string) =>
  queryOptions({
    queryKey: ["user-settings", userId],
    queryFn: async () => {
      const { data, error } = await getUserSettings(supabase);
      if (error) throw error;
      return data;
    },
  });
