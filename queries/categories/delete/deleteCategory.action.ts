"use server";

import { getAuthenticatedUser } from "@/lib/supabase/getAuthenticatedUser";
import { createClient } from "@/lib/supabase/server";

export type DeleteCategoryActionProps = {
  categoryId: number;
};

export const deleteCategoryAction = async ({
  categoryId,
}: DeleteCategoryActionProps) => {
  const supabase = await createClient();
  const user = await getAuthenticatedUser(supabase);

  const { error: categoryError } = await supabase
    .from("categories")
    .delete()
    .eq("id", categoryId)
    .eq("user_id", user.id);

  return categoryError ? { error: categoryError.message } : { success: true };
};
