import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

type Client = SupabaseClient<Database>;

export const getUserCategories = (client: Client, userId: string) => {
  return client
    .from("categories")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .throwOnError();
};
