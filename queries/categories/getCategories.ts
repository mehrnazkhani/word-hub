import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

type Client = SupabaseClient<Database>;

export const getUserCategories = (client: Client, userId: string) => {
  return client
    .from("categories")
    .select("*")
    .eq("user_id", userId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .throwOnError();
};

export const getSystemCategoryId = async (client: Client) => {
  const { data, error } = await client
    .from("categories")
    .select("id")
    .eq("is_system", true)
    .single();

  if (error || !data) {
    throw new Error("System category not found.");
  }

  return data.id;
};
