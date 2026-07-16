"use server";

import { createClient } from "../supabase/server";
import { getAuthenticatedUser } from "../supabase/getAuthenticatedUser";
import { wordInsertSchema } from "@/schemas/word/wordInsert.schema";
import { safeParseInput } from "@/features/authentication/lib/safeParseInput";
import { getSystemCategoryId } from "@/queries/categories/getCategories";
import { mapAddWordFormToInsert } from "@/schemas/word/word.mapper";
import type { AddWordFormValues } from "@/schemas/word/addWord.schema";

export const createWordAction = async (formData: AddWordFormValues) => {
  const user = await getAuthenticatedUser();

  const parsed = safeParseInput({
    schema: wordInsertSchema,
    data: mapAddWordFormToInsert(formData),
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
