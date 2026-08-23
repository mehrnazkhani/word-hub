"use client";

import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";
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
  const [shuffledWords, setShuffledWords] = useState(words);
  const [showResults, setShowResults] = useState(false);
  const totalQuestions = words.length;

  useEffect(() => {
    setShuffledWords([...words].sort(() => Math.random() - 0.5));
  }, [words]);

  const {
    selectedWord,
    selectedTranslation,
    matchStatuses,
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
          onSelect={handleTranslationSelect}
          matchStatuses={matchStatuses}
        />
        <MatchColumn
          items={visibleWords.map((w) => ({ id: w.id, label: w.word }))}
          selectedId={selectedWord}
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
