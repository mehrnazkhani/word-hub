"use client";

import { updateDailyWordSettingsAction } from "./updateDailyWordSettings.action";
import { useUserSettingsMutation } from "@/queries/user-settings/useUserSettings.mutation";
import type { DailyWordSettingsValues } from "./dailyWordSettings.schema";

export const useUpdateDailyWordSettingsMutation = () =>
  useUserSettingsMutation<DailyWordSettingsValues>(
    updateDailyWordSettingsAction,
  );
