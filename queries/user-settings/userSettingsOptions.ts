import { queryOptions } from "@tanstack/react-query";
import { getUserSettings } from "./getUserSettings";
import { queryKeys } from "../queries";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { UserSettings } from "@/types/db-aliases";

export const userSettingsOptions = (supabase: SupabaseClient, userId: string) =>
  queryOptions({
    queryKey: queryKeys.settings.user(userId),
    queryFn: async () => {
      const { data, error } = await getUserSettings(supabase);
      if (error) throw error;
      if (!data) return null;

      return {
        ...data,
        ai_fill_fields: data.ai_fill_fields as UserSettings["ai_fill_fields"],
      } satisfies UserSettings;
    },
  });
