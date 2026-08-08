import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import type { UserSettings } from "@/types/db-aliases";
type Client = SupabaseClient<Database>;

export const getDailyWordSuggestionsAction = async (
  client: Client,
  settings: UserSettings,
) => {
  const today = new Date().toISOString().split("T")[0];

  return client
    .from("daily_word_suggestions")
    .select("*")
    .eq("source_language_id", settings.daily_word_source_lang_id!)
    .eq("level", settings.daily_word_level)
    .lte("display_date", today)
    .order("display_date", { ascending: false })
    .limit(1)
    .single()
    .throwOnError();
};
