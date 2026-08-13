import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";
import type { PracticeModeName } from "@/constants/practice-modes";
import type { CategoryId } from "@/features/practices/practice-modes/PracticeCategoryList";
import { getPracticeModeWords } from "@/queries/words/getPracticeModeWords";
import {
  MIN_WORDS_REQUIRED,
  PRACTICE_MODE_CONFIG,
} from "@/constants/practice-modes";

type ValidatePracticeModeProps = {
  client: SupabaseClient<Database>;
  userId: string;
  categoryId: CategoryId;
  practiceMode: PracticeModeName;
};

export const validatePracticeMode = async ({
  client,
  userId,
  categoryId,
  practiceMode,
}: ValidatePracticeModeProps): Promise<boolean> => {
  const { extraFields } = PRACTICE_MODE_CONFIG[practiceMode];

  if (categoryId === "mixed") {
    // TODO: کوئری mixed
    return true;
  }

  const { data: words } = await getPracticeModeWords({
    client,
    userId,
    categoryId,
    extraFields,
  });

  return (words?.length ?? 0) >= MIN_WORDS_REQUIRED;
};
