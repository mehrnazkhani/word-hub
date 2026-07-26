"use server";

import { getAuthenticatedUser } from "@/lib/supabase/getAuthenticatedUser";
import { createClient } from "@/lib/supabase/server";
import type { Category } from "@/types/db-aliases";

export type DeleteCategoryActionProps = {
  category: Category;
};

export const deleteCategoryAction = async ({
  category,
}: DeleteCategoryActionProps) => {
  const supabase = await createClient();
  const user = await getAuthenticatedUser();

  const { error: categoryError } = await supabase
    .from("categories")
    .delete()
    .eq("id", category.id)
    .eq("user_id", user.id);

  return categoryError ? { error: categoryError.message } : { success: true };
};
