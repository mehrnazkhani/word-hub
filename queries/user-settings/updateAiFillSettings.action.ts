"use server";

import { createClient } from "@/lib/supabase/server";
import { getAuthenticatedUser } from "@/lib/supabase/getAuthenticatedUser";
import type { AiFillFields } from "@/types/db-aliases";

export const updateAiFillSettingsAction = async (data: AiFillFields) => {
  const supabase = await createClient();
  const user = await getAuthenticatedUser();

  const { error } = await supabase
    .from("user_settings")
    .update({ ai_fill_fields: data })
    .eq("user_id", user.id);

  return;
};
