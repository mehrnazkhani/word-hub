"use server";

import { getAuthenticatedUser } from "@/lib/supabase/getAuthenticatedUser";
import { createClient } from "@/lib/supabase/server";

type moveWordActionProps = {
  wordId: number;
  toCategoryId: number;
};

export const moveWordAction = async ({
  wordId,
  toCategoryId,
}: moveWordActionProps) => {
  const supabase = await createClient();
  const user = await getAuthenticatedUser();

  const { error } = await supabase
    .from("words")
    .update({ category_id: toCategoryId })
    .eq("id", wordId)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
};
