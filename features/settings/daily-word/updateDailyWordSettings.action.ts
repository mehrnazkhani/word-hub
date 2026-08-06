"use server";

import { updateUserSettingsAction } from "@/queries/user-settings/updateUserSettings.action";
import {
  dailyWordSettingsSchema,
  type DailyWordSettingsValues,
} from "./dailyWordSettings.schema";

export const updateDailyWordSettingsAction = async (
  data: DailyWordSettingsValues,
) => {
  const parsed = dailyWordSettingsSchema.safeParse(data);
  if (!parsed.success) throw new Error("Invalid data");
  return updateUserSettingsAction(parsed.data);
};
