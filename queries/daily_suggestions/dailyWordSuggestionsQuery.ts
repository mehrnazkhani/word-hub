import { QueryClient } from "@tanstack/react-query";
import { getDailyWordSuggestionsAction } from "./getDailyWordSuggestions";
import { getSavedWordSuggestionAction } from "./getSavedWordSuggestion.action";
import { queryKeys } from "@/queries/queries";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { UserSettings } from "@/types/db-aliases";

export const dailyWordSuggestionsQuery = (
  supabase: SupabaseClient,
  settings: UserSettings,
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
    if (!data) return null;

    const { data: savedSuggestion } = await getSavedWordSuggestionAction({
      client: supabase,
      word: data.word,
    });

    return {
      ...data,
      savedSuggestion: savedSuggestion ?? null,
    };
  },
});

export const prefetchDailyWordSuggestion = async (
  queryClient: QueryClient,
  supabase: SupabaseClient,
  settings: UserSettings,
) => {
  await queryClient.prefetchQuery(
    dailyWordSuggestionsQuery(supabase, settings),
  );
};
