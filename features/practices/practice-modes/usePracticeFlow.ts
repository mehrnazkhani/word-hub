"use client";

import { useMemo, useState } from "react";

import {
  MAX_WORD_SCORE,
  type PracticeModeName,
} from "@/constants/practice-modes";
import { usePracticeSession } from "./usePracticeSession";
import { usePracticeTimer } from "./usePracticeTimer";

import type { CategoryId } from "./PracticeCategoryList";
import type { PracticeModeWords } from "./validatePracticeMode";

type FlowQuestion = {
  id: number;
};

/** The questionnaire item name for a question, scoped by practice mode. */
export const getPracticeItemId = (
  practiceMode: PracticeModeName,
  questionId: number,
) => `${practiceMode}-${questionId}`;

type UsePracticeFlowOptions<T extends FlowQuestion> = {
  questions: T[] | null;
  results: Record<number, boolean>;
  words: PracticeModeWords;
  categoryId: CategoryId;
  practiceMode: PracticeModeName;
  correctCount: number;
  incorrectCount: number;
  isCompleted: boolean;
  onComplete: () => void;
};

/**
 * Owns the parts every questionnaire practice mode shares: the current
 * question index, result dialog visibility, the timer, the score updates for
 * the words that were answered, and saving the session once it completes.
 */
export const usePracticeFlow = <T extends FlowQuestion>({
  questions,
  results,
  words,
  categoryId,
  practiceMode,
  correctCount,
  incorrectCount,
  isCompleted,
  onComplete,
}: UsePracticeFlowOptions<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const { elapsedSeconds } = usePracticeTimer({ stopWhen: isCompleted });

  const currentQuestion = questions?.[currentIndex] ?? null;
  const isLastQuestion =
    questions !== null && currentIndex === questions.length - 1;

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
  }, [questions, results, words]);

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

  const navigateToItem = (item: string) => {
    const nextIndex =
      questions?.findIndex(
        (question) => getPracticeItemId(practiceMode, question.id) === item,
      ) ?? -1;

    if (nextIndex !== -1) setCurrentIndex(nextIndex);
  };

  const goToNextQuestion = () => {
    setCurrentIndex((index) => index + 1);

    if (!isLastQuestion) return;

    onComplete();
    setShowResults(true);
  };

  return {
    currentIndex,
    currentQuestion,
    isLastQuestion,
    navigateToItem,
    goToNextQuestion,
    showResults,
    setShowResults,
    elapsedSeconds,
  };
};
