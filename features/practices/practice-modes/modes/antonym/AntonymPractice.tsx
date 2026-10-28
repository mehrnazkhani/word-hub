"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { getTextDirection } from "@/lib/utils/getTextDirection";
import {
  Questionnaire,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnaireProgress,
  QuestionnaireSubmit,
} from "@/components/ui/questionnaire";
import { MAX_WORD_SCORE, MIN_WORDS_REQUIRED } from "@/constants/practice-modes";

import { PracticeContainer } from "../../PracticeContainer";
import { PracticeResultDialog } from "../../PracticeResultDialog";
import { usePracticeSession } from "../../usePracticeSession";
import { usePracticeTimer } from "../../usePracticeTimer";
import { useAntonymPractice } from "./useAntonymPractice";
import { useAntonymQuestions } from "./useAntonymQuestions";

import type { CategoryId } from "../../PracticeCategoryList";
import type { PracticeModeWords } from "../../validatePracticeMode";
import type { PracticeModeName } from "@/constants/practice-modes";

// How long the revealed answers stay visible before the next question.
const ADVANCE_DELAY_MS = 1200;

type AntonymPracticeProps = {
  categoryId: CategoryId;
  words: PracticeModeWords;
  practiceMode: PracticeModeName;
};

export const AntonymPractice = ({
  categoryId,
  words,
  practiceMode,
}: AntonymPracticeProps) => {
  const questions = useAntonymQuestions(words);
  const {
    selections,
    revealed,
    results,
    isCompleted,
    correctCount,
    incorrectCount,
    pickOption,
    reveal,
    complete,
  } = useAntonymPractice(questions ?? []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const advanceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { elapsedSeconds } = usePracticeTimer({ stopWhen: isCompleted });

  // Never leave a pending reveal timer behind.
  useEffect(() => {
    return () => {
      if (advanceTimeoutRef.current !== null) {
        clearTimeout(advanceTimeoutRef.current);
      }
    };
  }, []);

  // Moving to another question (e.g. clicking Continue again) cancels the
  // pending reveal timer so the practice cannot skip a question.
  useEffect(() => {
    if (advanceTimeoutRef.current === null) return;

    clearTimeout(advanceTimeoutRef.current);
    advanceTimeoutRef.current = null;
  }, [currentIndex]);

  const wordsToUpdate = useMemo(() => {
    if (!questions) return [];

    const wordsById = new Map(words.map((word) => [word.id, word]));

    return questions.flatMap((question) => {
      const word = wordsById.get(question.id);
      const result = results[question.id];

      if (!word || result === undefined) return [];

      return [
        {
          id: word.id,
          score: Math.min(
            Math.max(word.score + (result ? 1 : -1), 0),
            MAX_WORD_SCORE,
          ),
        },
      ];
    });
  }, [questions, words, results]);

  usePracticeSession({
    isCompleted,
    elapsedSeconds,
    categoryId,
    practiceMode,
    correctCount,
    incorrectCount,
    totalQuestions: questions?.length ?? 0,
    wordsToUpdate,
  });

  const currentQuestion = questions?.[currentIndex] ?? null;
  const selectedCount = currentQuestion
    ? (selections[currentQuestion.id]?.length ?? 0)
    : 0;
  const hasSelection = selectedCount > 0;
  const isRevealed = currentQuestion
    ? revealed[currentQuestion.id] !== undefined
    : false;

  const handleItemChange = (item: string) => {
    // Leaving an unrevealed question settles it as-is, so the
    // questionnaire's own navigation never skips scoring.
    const leavingQuestion = questions?.[currentIndex];

    if (leavingQuestion) reveal(leavingQuestion);

    const nextIndex =
      questions?.findIndex((question) => `antonym-${question.id}` === item) ??
      -1;

    if (nextIndex !== -1) setCurrentIndex(nextIndex);
  };

  if (!questions) {
    return (
      <PracticeContainer current={0} total={0}>
        <main className="flex flex-1 items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading…</p>
        </main>
      </PracticeContainer>
    );
  }

  if (questions.length === 0) {
    return (
      <PracticeContainer current={0} total={0}>
        <main className="flex flex-1 items-center justify-center">
          <div className="max-w-sm space-y-2 text-center">
            <h1 className="font-medium">Not enough words</h1>
            <p className="text-sm text-muted-foreground">
              Antonyms needs at least {MIN_WORDS_REQUIRED} words with antonyms.
            </p>
          </div>
        </main>
      </PracticeContainer>
    );
  }

  if (!currentQuestion) {
    return (
      <PracticeContainer current={questions.length} total={questions.length}>
        <main className="flex flex-1 items-center justify-center">
          <p className="text-sm text-muted-foreground">Practice complete</p>
        </main>

        <PracticeResultDialog
          open={showResults}
          onOpenChange={setShowResults}
          correctCount={correctCount}
          incorrectCount={incorrectCount}
          elapsedSeconds={elapsedSeconds}
          totalWords={questions.length}
        />
      </PracticeContainer>
    );
  }

  const isLastQuestion = currentIndex === questions.length - 1;

  const ContinueButton = isLastQuestion
    ? QuestionnaireSubmit
    : QuestionnaireNext;

  const goToNextQuestion = () => {
    setCurrentIndex((index) => index + 1);

    if (!isLastQuestion) return;

    complete();
    setShowResults(true);
  };

  const revealAndAdvance = () => {
    reveal(currentQuestion);

    // A second click right after the first one must not schedule twice.
    if (advanceTimeoutRef.current !== null) return;

    advanceTimeoutRef.current = setTimeout(() => {
      advanceTimeoutRef.current = null;
      goToNextQuestion();
    }, ADVANCE_DELAY_MS);
  };

  return (
    <PracticeContainer current={currentIndex} total={questions.length}>
      <main className="flex flex-1 flex-col justify-center pb-[clamp(24px,6vh,64px)]">
        <Questionnaire
          item={`antonym-${currentQuestion.id}`}
          onItemChange={handleItemChange}
          className="gap-16"
          onSubmit={(event) => {
            event.preventDefault();

            // Reached before the answer was revealed (e.g. Ctrl+Enter).
            if (!isRevealed) {
              revealAndAdvance();
              return;
            }

            setCurrentIndex((index) => index + 1);
            complete();
            setShowResults(true);
          }}
        >
          <div className="mx-auto w-full max-w-xl space-y-1 text-start">
            <QuestionnaireProgress />
            <p className="text-sm text-muted-foreground">
              Select all antonyms of the word.
            </p>
          </div>

          {questions.map((question) => {
            const selected = selections[question.id] ?? [];
            const isQuestionRevealed = revealed[question.id] !== undefined;
            const direction = getTextDirection(question.word);

            return (
              <QuestionnaireItem
                key={question.id}
                name={`antonym-${question.id}`}
                multiple
                required
                aria-labelledby={`antonym-word-${question.id}`}
                className="gap-16"
              >
                <p
                  id={`antonym-word-${question.id}`}
                  dir={direction}
                  lang={direction === "rtl" ? "fa" : undefined}
                  className="text-center font-heading text-lg leading-relaxed font-medium text-pretty sm:text-xl"
                >
                  {question.word}
                </p>

                <QuestionnaireChoices
                  inert={isQuestionRevealed}
                  aria-disabled={isQuestionRevealed}
                  className={cn(
                    "mx-auto grid w-full max-w-xl gap-3 sm:grid-cols-2",
                    isQuestionRevealed && "pointer-events-none",
                  )}
                >
                  {question.options.map((option) => {
                    const isPicked = selected.includes(option);
                    const isCorrectOption = question.antonyms.includes(option);

                    return (
                      <QuestionnaireChoice
                        key={option}
                        value={option}
                        checked={isPicked}
                        onChange={() => pickOption(question, option)}
                        className={cn(
                          isCorrectOption &&
                            (isPicked || isQuestionRevealed) &&
                            "border-emerald-500/60 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
                          isPicked &&
                            !isCorrectOption &&
                            "border-destructive/60 bg-destructive/10 text-destructive",
                          isQuestionRevealed &&
                            !isPicked &&
                            !isCorrectOption &&
                            "opacity-50",
                        )}
                      >
                        {option}
                      </QuestionnaireChoice>
                    );
                  })}
                </QuestionnaireChoices>
              </QuestionnaireItem>
            );
          })}

          <ContinueButton
            size="lg"
            disabled={!hasSelection}
            onClick={(event) => {
              // The first press reveals the answer, then continues.
              if (isRevealed) return;

              event.preventDefault();
              revealAndAdvance();
            }}
            className="mx-auto w-full max-w-xl cursor-pointer"
          >
            Continue
          </ContinueButton>
        </Questionnaire>
      </main>
    </PracticeContainer>
  );
};
