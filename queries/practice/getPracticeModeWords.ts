import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import type { Word } from "@/types/db-aliases";
import type { PracticeModeName } from "@/constants/practice-modes";
import type { CategoryId } from "@/features/practices/practice-modes/PracticeCategoryList";

type Client = SupabaseClient<Database>;

type PracticeBaseFields = Pick<
  Word,
  "id" | "word" | "score" | "source_language_id"
>;

type PracticeExtraFields = Pick<
  Word,
  "translation" | "description" | "example" | "synonyms" | "antonyms"
>;

export type PracticeWord = PracticeBaseFields & Partial<PracticeExtraFields>;

const BASE_FIELDS = "id, word, score, source_language_id" as const;

const PRACTICE_FIELDS: Record<PracticeModeName, keyof PracticeExtraFields> = {
  match: "translation",
  write: "translation",
  guess: "description",
  fill: "example",
  synonym: "synonyms",
  antonym: "antonyms",
};

const MIXED_WORD_LIMIT = 20;

type GetPracticeModeWordsProps = {
  client: Client;
  userId: string;
  categoryId: CategoryId;
  practiceMode: PracticeModeName;
};

export const getPracticeModeWords = async ({
  client,
  userId,
  categoryId,
  practiceMode,
}: GetPracticeModeWordsProps): Promise<PracticeWord[]> => {
  const field = PRACTICE_FIELDS[practiceMode];

  if (categoryId === "mixed") {
    const { data, error } = await client
      .rpc("get_random_practice_words", {
        p_user_id: userId,
        p_practice_field: field,
        p_limit: MIXED_WORD_LIMIT,
      })
      .throwOnError();

    return (data ?? []) as PracticeWord[];
  }

  const { data } = await client
    .from("words")
    .select(`${BASE_FIELDS}, ${field}`)
    .eq("user_id", userId)
    .eq("category_id", categoryId)
    .is("deleted_at", null)
    .not(field, "is", null)
    .throwOnError();

  const shuffledData = [...(data ?? [])].sort(() => Math.random() - 0.5);
  return shuffledData as PracticeWord[];
};
