"use server";

import { updateUserSettingsAction } from "@/queries/user-settings/updateUserSettings.action";
import {
  dailyWordSettingsDbSchema,
  type DailyWordSettingsValues,
} from "./dailyWordSettings.schema";

export const updateDailyWordSettingsAction = async (
  data: DailyWordSettingsValues,
) => {
  const parsed = dailyWordSettingsDbSchema.safeParse(data);
  if (!parsed.success) throw new Error("Invalid data");
  return updateUserSettingsAction(parsed.data);
};
