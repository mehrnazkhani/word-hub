"use client";

import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { shuffle } from "@/lib/utils/shuffle";
import { Button } from "@/components/ui/button";
import { PracticeResultDialog } from "../../PracticeResultDialog";

import { MatchColumn } from "./MatchColumn";
import { useMatchWord } from "./useMatchWord";
import { PracticeProgressbar } from "@/features/practices/practice-modes/PracticeProgressbar";
import { usePracticeTimer } from "@/features/practices/practice-modes/usePracticeTimer";
import { usePracticeSession } from "../../usePracticeSession";
import { MAX_WORD_SCORE } from "@/constants/practice-modes";

import type { CategoryId } from "../../PracticeCategoryList";
import type { PracticeModeWords } from "../../validatePracticeMode";
import type { PracticeModeName } from "@/constants/practice-modes";

type MatchWordPracticeProps = {
  categoryId: CategoryId;
  words: PracticeModeWords;
  practiceMode: PracticeModeName;
};

export const MatchWordPractice = ({
  categoryId,
  words,
  practiceMode,
}: MatchWordPracticeProps) => {
  // Shuffled once on mount. The lazy initializer runs only on the first
  // render, so the order stays stable for the whole practice session.
  const [shuffledWords] = useState(() => shuffle(words));
  const [showResults, setShowResults] = useState(false);
  const totalQuestions = words.length;

  const {
    selectedWord,
    selectedTranslation,
    matchStatuses,
    incorrectWordId,
    incorrectTranslationId,
    incorrectCount,
    matchedCount,
    isPracticeCompleted,
    visibleWords,
    visibleTranslations,
    handleWordSelect,
    handleTranslationSelect,
  } = useMatchWord(shuffledWords);

  const { elapsedSeconds } = usePracticeTimer({
    stopWhen: isPracticeCompleted,
  });

  const wordsToUpdate = useMemo(
    () =>
      shuffledWords.map((w) => ({
        id: w.id,
        score: Math.min(w.score + 1, MAX_WORD_SCORE),
      })),
    [shuffledWords],
  );

  usePracticeSession({
    isCompleted: isPracticeCompleted,
    elapsedSeconds,
    categoryId,
    practiceMode,
    correctCount: totalQuestions,
    incorrectCount,
    totalQuestions,
    wordsToUpdate,
  });

  return (
    <div className="mx-auto flex min-h-dvh max-w-4xl flex-col px-5">
      <header className="py-[clamp(24px,6vh,64px)]">
        <PracticeProgressbar
          current={matchedCount}
          total={shuffledWords.length}
        />
      </header>

      <main className="grid flex-1 grid-cols-2 items-center gap-6">
        <MatchColumn
          items={visibleTranslations.map((w) => ({
            id: w.id,
            label: w.translation!,
          }))}
          selectedId={selectedTranslation}
          incorrectId={incorrectTranslationId}
          onSelect={handleTranslationSelect}
          matchStatuses={matchStatuses}
        />
        <MatchColumn
          items={visibleWords.map((w) => ({ id: w.id, label: w.word }))}
          selectedId={selectedWord}
          incorrectId={incorrectWordId}
          onSelect={handleWordSelect}
          matchStatuses={matchStatuses}
        />
      </main>

      <footer className="py-[clamp(24px,6vh,64px)]">
        <Button
          className={cn(
            "w-full cursor-pointer",
            isPracticeCompleted
              ? "opacity-100"
              : "pointer-events-none invisible opacity-0",
          )}
          onClick={() => setShowResults(true)}
        >
          Continue
        </Button>
      </footer>

      <PracticeResultDialog
        open={showResults}
        onOpenChange={setShowResults}
        correctCount={totalQuestions}
        incorrectCount={incorrectCount}
        elapsedSeconds={elapsedSeconds}
        totalWords={totalQuestions}
      />
    </div>
  );
};
