import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";
import { getAuthenticatedUser } from "@/lib/supabase/getAuthenticatedUser";

type Client = SupabaseClient<Database>;

type GetSavedWordSuggestionActionProps = {
  client: Client;
  word: string;
};

export const getSavedWordSuggestionAction = async ({
  client,
  word,
}: GetSavedWordSuggestionActionProps) => {
  const user = await getAuthenticatedUser(client);

  return client
    .from("words")
    .select("id, category_id")
    .eq("user_id", user.id)
    .eq("word", word)
    .eq("source", "suggestion")
    .is("deleted_at", null)
    .maybeSingle()
    .throwOnError();
};
