import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

type Client = SupabaseClient<Database>;

type GetSavedWordSuggestionActionProps = {
  client: Client;
  word: string;
  userId: string;
};

export const getSavedWordSuggestionAction = async ({
  client,
  word,
  userId,
}: GetSavedWordSuggestionActionProps) => {
  return client
    .from("words")
    .select("id, category_id")
    .eq("user_id", userId)
    .eq("word", word)
    .eq("source", "suggestion")
    .is("deleted_at", null)
    .maybeSingle()
    .throwOnError();
};
