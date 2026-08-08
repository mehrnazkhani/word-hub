"use client";

import { queryKeys } from "@/queries/queries";
import { useUserSettings } from "@/queries/user-settings/useUserSettings";
import { useQueryClient } from "@tanstack/react-query";
import type { SavedSuggestion } from "./SaveWordButton";

export const useDailySuggestionCache = () => {
  const { data: userSettings } = useUserSettings();
  const queryClient = useQueryClient();

  const queryKey = queryKeys.word.dailySuggestion(
    userSettings!.daily_word_source_lang_id,
    userSettings!.daily_word_level,
  );

  const updateSavedSuggestion = (savedSuggestion: SavedSuggestion) =>
    queryClient.setQueryData(queryKey, (old: any) =>
      old ? { ...old, savedSuggestion } : old,
    );

  const getSnapshot = () => queryClient.getQueryData(queryKey);

  const restore = (snapshot: unknown) =>
    queryClient.setQueryData(queryKey, snapshot);

  return { updateSavedSuggestion, getSnapshot, restore };
};
