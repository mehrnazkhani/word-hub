import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

type Client = SupabaseClient<Database>;

export const getSavedWordSuggestionAction = async (
  client: Client,
  word: string,
) => {
  return client
    .from("words")
    .select("id, category_id")
    .eq("word", word)
    .eq("source", "suggestion")
    .is("deleted_at", null)
    .maybeSingle()
    .throwOnError();
};
