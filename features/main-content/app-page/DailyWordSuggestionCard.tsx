"use client";

import { WordOfTheDay } from "./WordOfTheDay";
import { WordOfTheDayEmpty } from "./WordOfTheDayEmpty";

import { useDailyWordSuggestion } from "@/queries/daily_suggestions/useDailyWordSuggestion";

export const DailyWordSuggestionCard = () => {
  const { data: dailyWordSuggestion } = useDailyWordSuggestion();

  return;
};
