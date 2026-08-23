"use client";

import { useEffect, useRef } from "react";
import { useSavePracticeSessionMutation } from "@/queries/practice/useSavePracticeSessionMutation";
import { useUpdateWordsScoreMutation } from "@/queries/practice/useUpdateWordsScore.mutation";
import type { CategoryId } from "./PracticeCategoryList";
import {
  getPracticeLabel,
  type PracticeModeName,
} from "@/constants/practice-modes";

type WordScoreUpdate = {
  id: number;
  score: number;
};

type Options = {
  isCompleted: boolean;
  categoryId: CategoryId;
  practiceMode: PracticeModeName;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  elapsedSeconds: number;
  wordsToUpdate: WordScoreUpdate[];
};

export const usePracticeSession = ({
  isCompleted,
  categoryId,
  practiceMode,
  totalQuestions,
  correctCount,
  incorrectCount,
  elapsedSeconds,
  wordsToUpdate,
}: Options) => {
  const { mutate: savePracticeSession } = useSavePracticeSessionMutation();
  const { mutate: updateWordsScore } = useUpdateWordsScoreMutation();
  const sessionSavedRef = useRef(false);

  const practiceLabel = getPracticeLabel(practiceMode);

  useEffect(() => {
    if (!isCompleted || sessionSavedRef.current) return;
    sessionSavedRef.current = true;

    savePracticeSession({
      category_id: categoryId === "mixed" ? null : categoryId,
      practice_mode: practiceLabel,
      correct_count: correctCount,
      incorrect_count: incorrectCount,
      duration: elapsedSeconds,
      total_questions: totalQuestions,
    });

    if (wordsToUpdate.length > 0) {
      updateWordsScore(wordsToUpdate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompleted]);
};
