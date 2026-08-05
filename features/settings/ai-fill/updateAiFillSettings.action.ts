"use server";

import { updateUserSettingsAction } from "@/queries/user-settings/updateUserSettings.action";
import type { AiFillFields } from "./aiFillFields.schema";

export const updateAiFillSettingsAction = async (data: AiFillFields) => {
  return updateUserSettingsAction({ ai_fill_fields: data });
};
