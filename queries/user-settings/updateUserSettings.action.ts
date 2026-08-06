"use server";

import { createClient } from "@/lib/supabase/server";
import { getAuthenticatedUser } from "@/lib/supabase/getAuthenticatedUser";
import type { UpdateUserSettings, UserSettings } from "@/types/db-aliases";

export async function updateUserSettingsAction(
  fields: Partial<UpdateUserSettings>,
) {
  const supabase = await createClient();
  const user = await getAuthenticatedUser(supabase);

  const { data, error } = await supabase
    .from("user_settings")
    .update(fields)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as UserSettings;
}
