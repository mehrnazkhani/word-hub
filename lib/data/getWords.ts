import { getAuthenticatedUser } from "../supabase/getAuthenticatedUser";
import { createClient } from "../supabase/server";

const selectFields =
  "id, antonyms, category_id, source_language_id, target-language_id, created_at, deleted_at, description, part_of_speech, score, synonyms, translation, translation_audio, updated_at, user_audio, word";

export const getActiveWords = async (categoryId: number | null) => {
  const user = await getAuthenticatedUser();
  const supabase = await createClient();

  let query = supabase
    .from("words")
    .select(selectFields)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (categoryId === null) {
    query = query.is("category_id", null);
  } else {
    query = query.eq("category_id", categoryId);
  }

  console.log("fetching words");

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching words:", error);
    return [];
  }

  return data;
};

export const getDeletedWords = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("words")
    .select(selectFields)
    .not("deleted_at", "is", null)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching deleted words:", error);
    return [];
  }

  return data ?? [];
};
