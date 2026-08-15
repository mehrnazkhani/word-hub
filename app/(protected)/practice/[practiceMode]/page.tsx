import { notFound } from "next/navigation";

import { MatchingPractice } from "@/features/practices/practice-modes/modes/MatchingPractice";
import { getUserCategoryById } from "@/queries/categories/getCategories";
import { createClient } from "@/lib/supabase/server";
import { getAuthenticatedUser } from "@/lib/supabase/getAuthenticatedUser";
import { getCategoryWordCount } from "@/queries/words/getWords";
import {
  validatePracticeMode,
  type PracticeModeWords,
} from "@/features/practices/practice-modes/validatePracticeMode";
import {
  MIN_WORDS_REQUIRED,
  PRACTICE_MODES,
  type PracticeModeName,
} from "@/constants/practice-modes";
import type { CategoryId } from "@/features/practices/practice-modes/PracticeCategoryList";
import { NotEnoughWordsMessage } from "@/features/practices/practice-modes/NotEnoughWordsMessage";

const practiceComponents: Record<
  PracticeModeName,
  React.ComponentType<{ categoryId: CategoryId; words: PracticeModeWords }>
> = {
  match: MatchingPractice,
  guess: MatchingPractice, // TODO
  fill: MatchingPractice, // TODO
  write: MatchingPractice, // TODO
  synonym: MatchingPractice, // TODO
  antonym: MatchingPractice, // TODO
};

const VALID_PRACTICE_MODES = new Set<string>(
  PRACTICE_MODES.map((m) => m.practiceMode),
);

const PracticeModePage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ practiceMode: string }>;
  searchParams: Promise<{ category?: string }>;
}) => {
  const { practiceMode } = await params;
  const { category } = await searchParams;

  // 1. Validate practice mode
  if (!VALID_PRACTICE_MODES.has(practiceMode)) {
    notFound();
  }

  const PracticeComponent =
    practiceComponents[practiceMode as PracticeModeName];

  // 2. Validate category type
  const categoryId: CategoryId = (() => {
    if (!category || category === "mixed") return "mixed";
    const id = Number(category);
    if (isNaN(id) || id <= 0 || !Number.isInteger(id)) notFound();
    return id;
  })();

  // 3. Validate numeric category
  if (categoryId === "mixed") {
    // TODO: mixed
    return null;
  }

  const supabase = await createClient();
  const { id: userId } = await getAuthenticatedUser(supabase);

  const existingCategory = await getUserCategoryById({
    client: supabase,
    userId,
    categoryId,
  });

  if (!existingCategory) notFound();

  // 4. Validate word count
  const { count: categoryWordCount } = await getCategoryWordCount({
    client: supabase,
    userId,
    categoryId,
  });

  if ((categoryWordCount ?? 0) < MIN_WORDS_REQUIRED) {
    return (
      <NotEnoughWordsMessage
        categoryName={existingCategory.data?.name ?? "This category"}
      />
    );
  }

  // 5. Validate mode-specific words
  const words = await validatePracticeMode({
    client: supabase,
    userId,
    categoryId,
    practiceMode: practiceMode as PracticeModeName,
  });

  if (!words) notFound();

  return <PracticeComponent categoryId={categoryId} words={words} />;
};

export default PracticeModePage;
