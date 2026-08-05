"use client";

import { updateDefaultWordFormSettingsAction } from "./updateDefaultWordFormSettings.action";
import { useUserSettingsMutation } from "@/queries/user-settings/useUserSettings.mutation";
import type { WordFormSettingsValues } from "@/schemas/word/word.schema";

export const useUpdateDefaultWordFormSettingsMutation = () =>
  useUserSettingsMutation<WordFormSettingsValues>(
    updateDefaultWordFormSettingsAction,
  );
