"use server";

import { getAuthenticatedUser } from "@/lib/supabase/getAuthenticatedUser";
import { createClient } from "@/lib/supabase/server";
import type { InsertPractice } from "@/types/db-aliases";

type SavePracticeSessionProps = Omit<InsertPractice, "user_id">;

export const savePracticeSessionAction = async (
  sessionData: SavePracticeSessionProps,
) => {
  const supabase = await createClient();
  const user = await getAuthenticatedUser(supabase);

  const { data, error } = await supabase
    .from("practices")
    .insert({ ...sessionData, user_id: user.id })
    .select(`*, category:categories(name)`)
    .single();

  if (error) throw new Error(error.message);

  return data;
};
