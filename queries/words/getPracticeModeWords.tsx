import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

type Client = SupabaseClient<Database>;

const BASE_FIELDS = "id, word, score, source_language_id" as const;

type GetPracticeModeWordsProps = {
  client: Client;
  userId: string;
  categoryId: number;
  extraFields?: string;
};

export const getPracticeModeWords = ({
  client,
  userId,
  categoryId,
  extraFields,
}: GetPracticeModeWordsProps) => {
  const selectFields = extraFields
    ? `${BASE_FIELDS}, ${extraFields}`
    : BASE_FIELDS;

  let query = client
    .from("words")
    .select(selectFields)
    .eq("user_id", userId)
    .eq("category_id", categoryId)
    .is("deleted_at", null);

  if (extraFields) {
    query = query.not(extraFields, "is", null);
  }

  return query.throwOnError();
};
