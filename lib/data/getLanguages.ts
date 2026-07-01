import { createClient } from "../supabase/client";

export const getLanguages = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("languages")
    .select("id, label, value, flag")
    .order("label", { ascending: true });

  if (error) {
    console.error("Error fetching languages:", error);
    return [];
  }

  return data ?? [];
};
