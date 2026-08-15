import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import type { Word } from "@/types/db-aliases";
import type { PracticeModeName } from "@/constants/practice-modes";

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

type GetPracticeModeWordsProps = {
  client: Client;
  userId: string;
  categoryId: number;
  practiceMode: PracticeModeName;
};

export const getPracticeModeWords = async ({
  client,
  userId,
  categoryId,
  practiceMode,
}: GetPracticeModeWordsProps): Promise<PracticeWord[]> => {
  const field = PRACTICE_FIELDS[practiceMode];

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
