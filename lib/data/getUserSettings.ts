"use client";

import { createClient } from "@/lib/supabase/client";

export const getUserSettings = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("user_settings")
    .select(
      "default_source_lang_id, default_target_lang_id, default_category_id",
    )
    .single();

  if (error) {
    console.error("Error fetching user setting:", error);
    return null;
  }

  return data;
};
