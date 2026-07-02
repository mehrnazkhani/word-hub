"use server";

import { createClient } from "../supabase/server";
import { getAuthenticatedUser } from "../supabase/getAuthenticatedUser";
import { safeParseInput } from "@/features/authentication/lib/safeParseInput";
import { wordInsertSchema } from "@/features/word/add-word/schemas/wordInsert.schema";
import type { WordInsert } from "@/types/db-aliases";

export const createWordAction = async (insertData: WordInsert) => {
  const user = await getAuthenticatedUser();

  const parsed = safeParseInput({
    schema: wordInsertSchema,
    data: insertData,
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
