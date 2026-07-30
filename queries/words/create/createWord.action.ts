"use server";

import { createClient } from "../../../lib/supabase/server";
import { getAuthenticatedUser } from "../../../lib/supabase/getAuthenticatedUser";
import { safeParseInput } from "@/lib/utils/safeParseInput";
import { getSystemCategoryId } from "@/queries/categories/getCategories";
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
    return {
      status: "error" as const,
      message: error.message,
    };
  }

  return { status: "success" as const, data };
};
