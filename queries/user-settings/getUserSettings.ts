import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

type Client = SupabaseClient<Database>;

export const getUserSettings = async (client: Client) => {
  return client.from("user_settings").select("*").single().throwOnError();
};
