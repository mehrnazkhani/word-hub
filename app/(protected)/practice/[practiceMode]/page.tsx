import { notFound } from "next/navigation";

import { MatchWordPractice } from "@/features/practices/practice-modes/modes/match/MatchWordPractice";
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
  React.ComponentType<{
    practiceMode: PracticeModeName;
    categoryId: CategoryId;
    words: PracticeModeWords;
  }>
> = {
  match: MatchWordPractice,
  guess: MatchWordPractice, // TODO
  fill: MatchWordPractice, // TODO
  write: MatchWordPractice, // TODO
  synonym: MatchWordPractice, // TODO
  antonym: MatchWordPractice, // TODO
};

const VALID_PRACTICE_MODES = new Set<PracticeModeName>(
  PRACTICE_MODES.map((m) => m.practiceMode),
);

const isPracticeMode = (value: string): value is PracticeModeName => {
  return VALID_PRACTICE_MODES.has(value as PracticeModeName);
};

const PracticeModePage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ practiceMode: string }>;
  searchParams: Promise<{ category?: string }>;
}) => {
  const { practiceMode } = await params;
  const { category } = await searchParams;

  if (!isPracticeMode(practiceMode)) notFound();

  const categoryId: CategoryId = (() => {
    if (!category || category === "mixed") return "mixed";
    const id = Number(category);
    if (isNaN(id) || id <= 0 || !Number.isInteger(id)) notFound();
    return id;
  })();

  const supabase = await createClient();
  const { id: userId } = await getAuthenticatedUser(supabase);

  // فقط برای category عددی این چک‌ها لازمه
  if (categoryId !== "mixed") {
    const existingCategory = await getUserCategoryById({
      client: supabase,
      userId,
      categoryId,
    });

    if (!existingCategory) notFound();

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
  }

  const words = await validatePracticeMode({
    client: supabase,
    userId,
    categoryId,
    practiceMode,
  });

  if (!words) notFound();

  const PracticeComponent = practiceComponents[practiceMode];

  return (
    <PracticeComponent
      practiceMode={practiceMode}
      categoryId={categoryId}
      words={words}
    />
  );
};

export default PracticeModePage;
