"use client";

import { updateDailyWordSettingsAction } from "./updateDailyWordSettings.action";
import { useUserSettingsMutation } from "@/queries/user-settings/useUserSettings.mutation";
import type { DailyWordSettingsValues } from "@/features/settings/daily-word/DailyWordSettings";

export const useUpdateDailyWordSettingsMutation = () =>
  useUserSettingsMutation<DailyWordSettingsValues>(
    updateDailyWordSettingsAction,
  );
