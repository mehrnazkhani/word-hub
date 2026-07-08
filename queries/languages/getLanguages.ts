import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

type Client = SupabaseClient<Database>;

export const getLanguages = (client: Client) => {
  return client
    .from("languages")
    .select("*")
    .order("label", { ascending: true })
    .throwOnError();
};
