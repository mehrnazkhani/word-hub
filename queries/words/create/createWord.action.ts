"use server";

import { createClient } from "../../../lib/supabase/server";
import { getAuthenticatedUser } from "../../../lib/supabase/getAuthenticatedUser";
import { safeParseInput } from "@/lib/utils/safeParseInput";
import { getSystemCategoryId } from "@/queries/categories/getCategories";
import { APP_LIMITS } from "@/constants/app-limits";

import {
  wordDbSchema,
  type AddWordFormValues,
} from "@/schemas/word/word.schema";

export const createWordAction = async (formData: AddWordFormValues) => {
  const user = await getAuthenticatedUser();

  const parsed = safeParseInput({
    schema: wordDbSchema,
    data: formData,
  });

  if (!parsed.success) {
    return {
      status: "validation_error" as const,
      fieldErrors: parsed.fieldErrors,
    };
  }

  const supabase = await createClient();

  const categoryId =
    parsed.data.category_id ?? (await getSystemCategoryId(supabase));

  const { data, error } = await supabase
    .from("words")
    .insert({ ...parsed.data, category_id: categoryId, user_id: user.id })
    .select()
    .single();

  if (error) {
    if (error.message.includes("WORD_LIMIT_REACHED")) {
      return {
        status: "limit_reached" as const,
        message: `You've reached the maximum limit of ${APP_LIMITS.word_limit_per_user} words.`,
      };
    }

    return {
      status: "error" as const,
      message: error.message,
    };
  }

  return { status: "success" as const, data };
};
