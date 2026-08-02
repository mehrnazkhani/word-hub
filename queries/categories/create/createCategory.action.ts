"use server";

import { getAuthenticatedUser } from "@/lib/supabase/getAuthenticatedUser";
import { createClient } from "@/lib/supabase/server";
import { safeParseInput } from "@/lib/utils/safeParseInput";
import { APP_LIMITS } from "@/constants/app-limits";

import {
  categoryFormSchema,
  type CategoryFormValues,
} from "@/features/category/category.schema";

export const createCategoryAction = async (formData: CategoryFormValues) => {
  const user = await getAuthenticatedUser();

  const parsed = safeParseInput({
    schema: categoryFormSchema,
    data: formData,
  });

  if (!parsed.success) {
    return {
      status: "validation_error" as const,
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
    if (error.message.includes("CATEGORY_LIMIT_REACHED")) {
      return {
        status: "limit_reached" as const,
        message: `You've reached the maximum limit of ${APP_LIMITS.category_limit_per_user} categories.`,
      };
    }

    if (error.code === "23505") {
      return {
        status: "validation_error" as const,
        fieldErrors: {
          name: ["A category with this name already exists."],
        },
      };
    }

    throw new Error(error.message);
  }

  return {
    status: "success" as const,
    data,
  };
};
