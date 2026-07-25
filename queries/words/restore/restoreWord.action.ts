"use server";

import { getAuthenticatedUser } from "@/lib/supabase/getAuthenticatedUser";
import { createClient } from "@/lib/supabase/server";

type RestoreWordActionProps = {
  wordId: number;
};

export const restoreWordAction = async ({ wordId }: RestoreWordActionProps) => {
  const supabase = await createClient();
  const user = await getAuthenticatedUser();

  const { error } = await supabase
    .from("words")
    .update({ deleted_at: null })
    .eq("id", wordId)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
};
