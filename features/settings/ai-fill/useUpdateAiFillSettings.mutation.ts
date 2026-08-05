"use client";

import { useUserSettingsMutation } from "@/queries/user-settings/useUserSettings.mutation";
import { updateAiFillSettingsAction } from "./updateAiFillSettings.action";
import type { AiFillFields } from "./aiFillFields.schema";

export const useUpdateAiFillSettingsMutation = () =>
  useUserSettingsMutation<AiFillFields>(updateAiFillSettingsAction);
