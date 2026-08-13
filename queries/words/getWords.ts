import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

type Client = SupabaseClient<Database>;

type BaseProps = {
  client: Client;
  userId: string;
};

type CategoryProps = BaseProps & {
  categoryId: number;
};

type RecentProps = BaseProps & {
  limit?: number;
};

const selectFields =
  "id, antonyms, category_id, source_language_id, target_language_id, created_at, deleted_at, description, example, part_of_speech, score, synonyms, translation, updated_at, word, source";

export const getActiveWords = async ({
  client,
  userId,
  categoryId,
}: CategoryProps) => {
  return client
    .from("words")
    .select(selectFields)
    .eq("category_id", categoryId)
    .eq("user_id", userId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .throwOnError();
};

export const getAllActiveWords = async ({ client, userId }: BaseProps) => {
  return client
    .from("words")
    .select(selectFields)
    .eq("user_id", userId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .throwOnError();
};

export const getDeletedWords = async ({ client, userId }: BaseProps) => {
  return client
    .from("words")
    .select(selectFields)
    .eq("user_id", userId)
    .not("deleted_at", "is", null)
    .order("deleted_at", { ascending: false })
    .throwOnError();
};

export const getRecentWords = ({ client, userId, limit = 20 }: RecentProps) => {
  return client
    .from("words")
    .select(selectFields)
    .eq("user_id", userId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(limit)
    .throwOnError();
};

export const getWordsCount = async ({ client, userId }: BaseProps) => {
  return client
    .from("words")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .throwOnError();
};

export const getCategoryWordCount = async ({
  client,
  userId,
  categoryId,
}: CategoryProps) => {
  return client
    .from("words")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("category_id", categoryId)
    .is("deleted_at", null)
    .throwOnError();
};
