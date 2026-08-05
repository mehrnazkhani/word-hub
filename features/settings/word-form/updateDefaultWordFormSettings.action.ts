"use server";

import { updateUserSettingsAction } from "@/queries/user-settings/updateUserSettings.action";
import {
  wordFormSettingsSchema,
  type WordFormSettingsValues,
} from "@/schemas/word/word.schema";

export const updateDefaultWordFormSettingsAction = async (
  data: WordFormSettingsValues,
) => {
  const parsed = wordFormSettingsSchema.safeParse(data);
  if (!parsed.success) throw new Error("Invalid data");

  const { sourceLanguageId, targetLanguageId, categoryId } = parsed.data;

  return updateUserSettingsAction({
    default_source_lang_id:
      sourceLanguageId != null ? Number(sourceLanguageId) : null,
    default_target_lang_id:
      targetLanguageId != null ? Number(targetLanguageId) : null,
    default_category_id: categoryId != null ? Number(categoryId) : null,
  });
};
