"use server";

import { getAuthenticatedUser } from "@/lib/supabase/getAuthenticatedUser";
import { createClient } from "@/lib/supabase/server";
import { safeParseInput } from "@/features/authentication/lib/safeParseInput";
import { categoryFormSchema } from "./categoryForm.schema";
import type { InsertCategory } from "@/types/db-aliases";

export const createCategoryAction = async (insertData: InsertCategory) => {
  const user = await getAuthenticatedUser();
  const userId = user.id;

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

  // Check Category Limit (Max
  const { error: limitError } = await supabase.rpc("check_category_limit", {
    p_user_id: userId,
  });

  if (limitError) {
    if (limitError.message === "category_limit_exceeded") {
      return {
        status: "limit_error",
        message: "You can only create up to 20 categories.",
      };
    }
    throw new Error(limitError.message);
  }

  // Check Duplicate Name And Insert Category
  const { data, error } = await supabase
    .from("categories")
    .insert({ ...parsed.data, user_id: userId })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      // unique_violation
      return {
        status: "validation_error",
        fieldErrors: {
          name: ["A category with this name already exists."],
        },
      };
    }

    console.error("Create Category error:", error);
    throw new Error(error.message);
  }

  return {
    status: "success",
    data,
  };
};
