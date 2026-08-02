"use server";

import { getAuthenticatedUser } from "@/lib/supabase/getAuthenticatedUser";
import { createClient } from "@/lib/supabase/server";
import {
  wordFormSettingsSchema,
  type WordFormSettingsValues,
} from "@/schemas/word/word.schema";

export const updateDefaultWordFormSettingsAction = async (
  data: WordFormSettingsValues,
) => {
  const supabase = await createClient();
  const user = await getAuthenticatedUser();

  const parsed = wordFormSettingsSchema.safeParse(data);
  if (!parsed.success) throw new Error("Invalid data");

  const { sourceLanguageId, targetLanguageId, categoryId } = parsed.data;

  const toNullableNumber = (value: string | null | undefined) =>
    value == null ? null : Number(value);

  const { error } = await supabase
    .from("user_settings")
    .update({
      default_source_lang_id: toNullableNumber(sourceLanguageId),
      default_target_lang_id: toNullableNumber(targetLanguageId),
      default_category_id: toNullableNumber(categoryId),
    })
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
};
