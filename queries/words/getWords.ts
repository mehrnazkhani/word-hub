import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

type Client = SupabaseClient<Database>;

type GetActiveWordsProps = {
  client: Client;
  userId: string;
  categoryId: number;
};

const selectFields =
  "id, antonyms, category_id, source_language_id, target_language_id, created_at, deleted_at, description, part_of_speech, score, synonyms, translation, translation_audio, updated_at, user_audio, word";

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
