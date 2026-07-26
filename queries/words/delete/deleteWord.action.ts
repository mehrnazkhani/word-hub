"use server";

import { getAuthenticatedUser } from "@/lib/supabase/getAuthenticatedUser";
import { createClient } from "@/lib/supabase/server";

type DeleteWordActionProps = {
  wordId: number;
};

export const softDeleteWordAction = async ({
  wordId,
}: DeleteWordActionProps) => {
  const supabase = await createClient();
  const user = await getAuthenticatedUser();

  const { error } = await supabase
    .from("words")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", wordId)
    .eq("user_id", user.id)
    .is("deleted_at", null);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
};

export const permanentDeleteWordAction = async ({
  wordId,
}: DeleteWordActionProps) => {
  const supabase = await createClient();
  const user = await getAuthenticatedUser();

  const { error } = await supabase
    .from("words")
    .delete()
    .eq("id", wordId)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
};
