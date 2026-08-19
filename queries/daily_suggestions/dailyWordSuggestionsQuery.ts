import { QueryClient } from "@tanstack/react-query";
import { getDailyWordSuggestionsAction } from "./getDailyWordSuggestions";
import { getSavedWordSuggestionAction } from "./getSavedWordSuggestion.action";
import { queryKeys } from "@/queries/queries";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { UserSettings } from "@/types/db-aliases";

type DailyWordSuggestionsQueryProps = {
  supabase: SupabaseClient;
  settings: UserSettings;
  userId: string;
};

export const dailyWordSuggestionsQuery = ({
  supabase,
  settings,
  userId,
}: DailyWordSuggestionsQueryProps) => ({
  queryKey: queryKeys.word.dailySuggestion(
    settings.daily_word_source_lang_id,
    settings.daily_word_level,
    userId,
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

type PrefetchDailyWordSuggestionProps = {
  queryClient: QueryClient;
  supabase: SupabaseClient;
  settings: UserSettings;
  userId: string;
};

export const prefetchDailyWordSuggestion = async ({
  queryClient,
  settings,
  supabase,
  userId,
}: PrefetchDailyWordSuggestionProps) => {
  await queryClient.prefetchQuery(
    dailyWordSuggestionsQuery({ supabase, settings, userId }),
  );
};
