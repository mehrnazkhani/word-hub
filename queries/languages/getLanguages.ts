import { createClient } from "@/lib/supabase/client";
import type { Language } from "@/types/db-aliases";

const selectFields = "id, created_at, flag, label, value";

export const getLanguages = async (): Promise<Language[]> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("languages")
    .select(selectFields)
    .order("label", { ascending: true });

  console.log("query: fetching language");

  if (error) {
    console.error("Error fetching languages:", error);
    return [];
  }

  return data ?? [];
};
