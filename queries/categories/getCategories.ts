import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import type { CategoryWithWordCount } from "@/types/db-aliases";

type Client = SupabaseClient<Database>;

export const getUserCategories = async (
  client: Client,
  userId: string,
): Promise<CategoryWithWordCount[]> => {
  const { data } = await client
    .from("categories")
    .select(`*, wordCount:words(count)`)
    .eq("user_id", userId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .throwOnError();

  return data.map((category) => ({
    ...category,
    wordCount: category.wordCount[0]?.count ?? 0,
  }));
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

type GetUserCategoryByIdProps = {
  client: Client;
  userId: string;
  categoryId: number;
};

export const getUserCategoryById = ({
  client,
  userId,
  categoryId,
}: GetUserCategoryByIdProps) => {
  return client
    .from("categories")
    .select("id, is_system, created_at, name, updated_at")
    .eq("id", categoryId)
    .eq("user_id", userId)
    .is("deleted_at", null)
    .maybeSingle();
};
