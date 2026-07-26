"use server";

import { getAuthenticatedUser } from "@/lib/supabase/getAuthenticatedUser";
import { createClient } from "@/lib/supabase/server";
import { safeParseInput } from "@/lib/utils/safeParseInput";
import {
  categoryFormSchema,
  type CategoryFormValues,
} from "@/features/category/category.schema";

export type RenameCategoryActionProps = {
  formData: CategoryFormValues;
  categoryId: number;
};

export const renameCategoryAction = async ({
  formData,
  categoryId,
}: RenameCategoryActionProps) => {
  const user = await getAuthenticatedUser();
  const userId = user.id;

  const parsed = safeParseInput({
    schema: categoryFormSchema,
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
    .from("categories")
    .update({ name: parsed.data.name })
    .eq("id", categoryId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return {
        status: "validation_error",
        fieldErrors: {
          name: ["A category with this name already exists."],
        },
      };
    }

    console.error("Rename Category error:", error);
    throw new Error(error.message);
  }

  if (!data) {
    return {
      status: "not_found",
      message: "Category not found or you don't have permission to rename it.",
    };
  }

  return {
    status: "success" as const,
    data,
  };
};
