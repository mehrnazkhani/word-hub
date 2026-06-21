import { createClient } from "../supabase/server";

export const getWords = async (categoryId: number) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("words")
    .select(
      "id, antonyms, category_id, created_at, deleted_at, description, part_of_speech, score, source_flag, source_language, synonyms, target_flag, target_language, translation, translation_audio, updated_at, user_audio, word",
    )
    .eq("category_id", categoryId)
    .order("created_at", { ascending: false });

  console.log("fetching words");

  if (error) {
    console.error("Error fetching words:", error);
    return [];
  }

  return data;
};
