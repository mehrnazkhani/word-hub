"use client";

import { useEffect, useRef } from "react";
import { useSavePracticeSessionMutation } from "@/queries/practice/useSavePracticeSessionMutation";
import type { CategoryId } from "./PracticeCategoryList";
import {
  getPracticeLabel,
  type PracticeModeName,
} from "@/constants/practice-modes";

type Options = {
  isCompleted: boolean;
  categoryId: CategoryId;
  practiceMode: PracticeModeName;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  elapsedSeconds: number;
};

export const usePracticeSession = ({
  isCompleted,
  categoryId,
  practiceMode,
  totalQuestions,
  correctCount,
  incorrectCount,
  elapsedSeconds,
}: Options) => {
  const { mutate: savePracticeSession } = useSavePracticeSessionMutation();
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
  }, [isCompleted]);
};
