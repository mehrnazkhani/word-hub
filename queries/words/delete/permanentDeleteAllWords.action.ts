"use server";

import { getAuthenticatedUser } from "@/lib/supabase/getAuthenticatedUser";
import { createClient } from "@/lib/supabase/server";

export const permanentDeleteAllWordsAction = async () => {
  const supabase = await createClient();
  const user = await getAuthenticatedUser(supabase);

  const { error } = await supabase
    .from("words")
    .delete()
    .eq("user_id", user.id)
    .not("deleted_at", "is", null);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
};
