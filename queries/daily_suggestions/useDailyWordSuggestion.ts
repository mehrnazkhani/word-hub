"use client";

import { useQuery } from "@tanstack/react-query";

import { useUserSettings } from "../user-settings/useUserSettings";
import { useSupabase } from "@/lib/supabase/useSupabase";
import { useUser } from "@/components/providers/user-provider";

import { dailyWordSuggestionsQuery } from "./dailyWordSuggestionsQuery";

export const useDailyWordSuggestion = () => {
  const supabase = useSupabase();
  const { data: settings } = useUserSettings();
  const { user, isPending } = useUser();

  const enabled =
    !!user &&
    !isPending &&
    !!settings?.daily_word_enabled &&
    !!settings?.daily_word_source_lang_id &&
    !!settings?.daily_word_level;

  return useQuery({
    ...dailyWordSuggestionsQuery({
      supabase,
      settings: settings!,
      userId: user!.id,
    }),
    enabled,
  });
};
