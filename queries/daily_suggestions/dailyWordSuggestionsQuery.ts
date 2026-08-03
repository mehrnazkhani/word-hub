import { QueryClient } from "@tanstack/react-query";
import { getDailyWordSuggestionsAction } from "./getDailyWordSuggestions";
import { queryKeys } from "@/queries/queries";
import type { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

type Settings = Database["public"]["Tables"]["user_settings"]["Row"];

export const dailyWordSuggestionsQuery = (
  supabase: SupabaseClient,
  settings: Settings,
) => ({
  queryKey: queryKeys.word.dailySuggestion(
    settings.daily_word_source_lang_id,
    settings.daily_word_level,
  ),
  queryFn: async () => {
    const { data, error } = await getDailyWordSuggestionsAction(
      supabase,
      settings,
    );
    if (error) throw error;
    return data;
  },
});

export const prefetchDailyWordSuggestion = async (
  queryClient: QueryClient,
  supabase: SupabaseClient,
  settings: Settings,
) => {
  await queryClient.prefetchQuery(
    dailyWordSuggestionsQuery(supabase, settings),
  );
};
