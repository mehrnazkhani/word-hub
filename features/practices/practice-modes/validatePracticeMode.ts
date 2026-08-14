import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";
import type { PracticeModeName } from "@/constants/practice-modes";
import type { CategoryId } from "@/features/practices/practice-modes/PracticeCategoryList";
import type { PracticeWord } from "@/queries/words/getPracticeModeWords";
import { getPracticeModeWords } from "@/queries/words/getPracticeModeWords";
import { MIN_WORDS_REQUIRED } from "@/constants/practice-modes";

type ValidatePracticeModeProps = {
  client: SupabaseClient<Database>;
  userId: string;
  categoryId: CategoryId;
  practiceMode: PracticeModeName;
};

export type PracticeModeWords = PracticeWord[];

export const validatePracticeMode = async ({
  client,
  userId,
  categoryId,
  practiceMode,
}: ValidatePracticeModeProps): Promise<PracticeModeWords | null> => {
  if (categoryId === "mixed") {
    // TODO: mixed
    return null;
  }

  const words = await getPracticeModeWords({
    client,
    userId,
    categoryId,
    practiceMode: practiceMode,
  });

  if (words.length < MIN_WORDS_REQUIRED) return null;

  return words;
};
