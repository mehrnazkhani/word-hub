"use server";

import { getAuthenticatedUser } from "@/lib/supabase/getAuthenticatedUser";
import { createClient } from "@/lib/supabase/server";

type WordScoreUpdate = {
  id: number;
  score: number;
};

type UpdatedWord = {
  id: number;
  score: number;
  category_id: number | null;
};

export const updateWordsScoreAction = async (
  words: WordScoreUpdate[],
): Promise<UpdatedWord[]> => {
  const supabase = await createClient();
  const user = await getAuthenticatedUser(supabase);

  const results = await Promise.all(
    words.map(({ id, score }) =>
      supabase
        .from("words")
        .update({ score })
        .eq("id", id)
        .eq("user_id", user.id)
        .select("id, score, category_id")
        .single(),
    ),
  );

  const failed = results.find((r) => r.error);
  if (failed?.error) throw new Error(failed.error.message);

  return results.map((r) => r.data as UpdatedWord);
};
