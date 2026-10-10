"use client";

import { getPlanFromSettings } from "./getUserPlan";
import type { UserPlan } from "@/constants/ai-config";
import { useUserSettings } from "./useUserSettings";

/**
 * Returns the user's AI plan derived from the prefetched/cached
 * user settings — no additional fetch.
 * Defaults to "free" while settings are loading or missing,
 * matching the server-side fallback.
 */
export const useUserPlan = (): UserPlan => {
  const { data: settings } = useUserSettings();
  return getPlanFromSettings(settings);
};
