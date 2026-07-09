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
  let query = client
    .from("words")
    .select(selectFields)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (categoryId === null) {
    query = query.is("category_id", null);
  } else {
    query = query.eq("category_id", categoryId);
  }

  return query.throwOnError();
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
    .order("created_at", { ascending: false })
    .throwOnError();
};
