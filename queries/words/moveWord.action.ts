"use server";

import { createClient } from "@/lib/supabase/server";

export type moveWordActionProps = {
  wordId: number;
  fromCategoryId: number;
  toCategoryId: number;
};

export const moveWordAction = async ({
  wordId,
  toCategoryId,
}: moveWordActionProps) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("words")
    .update({ category_id: toCategoryId })
    .eq("id", wordId);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
};
