"use client";

import { useQuery } from "@tanstack/react-query";
import { useUserSettings } from "../user-settings/useUserSettings";
import { useSupabase } from "@/lib/supabase/useSupabase";
import { dailyWordSuggestionsQuery } from "./dailyWordSuggestionsQuery";

export const useDailyWordSuggestion = () => {
  const supabase = useSupabase();
  const { data: settings } = useUserSettings();

  return useQuery({
    ...dailyWordSuggestionsQuery(supabase, settings!),
    enabled:
      !!settings?.daily_word_source_lang_id && !!settings?.daily_word_level,
  });
};
