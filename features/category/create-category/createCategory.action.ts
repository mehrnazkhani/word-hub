"use server";

import { getAuthenticatedUser } from "@/lib/supabase/getAuthenticatedUser";
import { createClient } from "@/lib/supabase/server";
import { safeParseInput } from "@/features/authentication/lib/safeParseInput";
import { categoryFormSchema } from "./categoryForm.schema";
import type { InsertCategory } from "@/types/db-aliases";

export const createCategoryAction = async (insertData: InsertCategory) => {
  const user = await getAuthenticatedUser();

  const parsed = safeParseInput({
    schema: categoryFormSchema,
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
    .from("categories")
    .insert({ ...parsed.data, user_id: user.id })
    .select()
    .single();

  if (error) {
    console.error("Create Category error:", error);
    throw new Error(error.message);
  }

  return data;
};
