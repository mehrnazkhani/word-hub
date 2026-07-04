"use server";

import { createClient } from "../supabase/server";
import { getAuthenticatedUser } from "../supabase/getAuthenticatedUser";
import { wordInsertSchema } from "@/schemas/word/wordInsert.schema";
import type { AddWordFormValues } from "@/schemas/word/addWord.schema";
import { safeParseInput } from "@/features/authentication/lib/safeParseInput";

export const createWordAction = async (formData: AddWordFormValues) => {
  const user = await getAuthenticatedUser();

  const parsed = safeParseInput({
    schema: wordInsertSchema,
    data: formData,
  });

  if (!parsed.success) {
    return {
      status: "validation_error",
      fieldErrors: parsed.fieldErrors,
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("words")
    .insert({ ...parsed.data, user_id: user.id })
    .select()
    .single();

  if (error) {
    console.error("Create word error:", error);
    throw new Error(error.message);
  }

  return data;
};
