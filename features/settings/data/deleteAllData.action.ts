"use server";

import { createClient } from "@/lib/supabase/server";
import { getAuthenticatedUser } from "@/lib/supabase/getAuthenticatedUser";

export const deleteAllDataAction = async () => {
  const supabase = await createClient();
  const user = await getAuthenticatedUser(supabase);

  // Delete all words (active + trashed).
  const { error: wordsError } = await supabase
    .from("words")
    .delete()
    .eq("user_id", user.id);

  if (wordsError) {
    return { error: wordsError.message };
  }

  // Delete non-system categories only (is_system false or null).
  // System categories are preserved.
  const { error: categoriesError } = await supabase
    .from("categories")
    .delete()
    .eq("user_id", user.id)
    .or("is_system.is.null,is_system.eq.false");

  if (categoriesError) {
    return { error: categoriesError.message };
  }

  return { success: true };
};
