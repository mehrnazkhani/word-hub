import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

type Client = SupabaseClient<Database>;

type GetActiveWordsProps = {
  client: Client;
  userId: string;
  categoryId: number;
};

const selectFields =
  "id, antonyms, category_id, source_language_id, target_language_id, created_at, deleted_at, description, example, part_of_speech, score, synonyms, translation, updated_at, word, source";

export const getActiveWords = async ({
  client,
  userId,
  categoryId,
}: GetActiveWordsProps) => {
  return client
    .from("words")
    .select(selectFields)
    .eq("category_id", categoryId)
    .eq("user_id", userId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .throwOnError();
};

type GetAllActiveWordsProps = {
  client: Client;
  userId: string;
};

export const getAllActiveWords = async ({
  client,
  userId,
}: GetAllActiveWordsProps) => {
  return client
    .from("words")
    .select(selectFields)
    .eq("user_id", userId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .throwOnError();
};

type GetDeletedWordsProps = {
  client: Client;
  userId: string;
};

export const getDeletedWords = async ({
  client,
  userId,
}: GetDeletedWordsProps) => {
  return client
    .from("words")
    .select(selectFields)
    .eq("user_id", userId)
    .not("deleted_at", "is", null)
    .order("deleted_at", { ascending: false })
    .throwOnError();
};

type getRecentWordsProps = {
  client: Client;
  userId: string;
  limit?: number;
};

export const getRecentWords = ({
  client,
  userId,
  limit = 20,
}: getRecentWordsProps) => {
  return client
    .from("words")
    .select(selectFields)
    .eq("user_id", userId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(limit)
    .throwOnError();
};

type GetWordCountProps = {
  client: Client;
  userId: string;
};

export const getWordsCount = async ({ client, userId }: GetWordCountProps) => {
  return client
    .from("words")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .throwOnError();
};
