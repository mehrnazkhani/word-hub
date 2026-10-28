"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";

import { buildRelatedQuestions } from "./buildRelatedQuestions";
import type { PracticeModeWords } from "../../validatePracticeMode";
import type { RelatedField, RelatedQuestion } from "./types";

const subscribe = () => () => {};

const getServerSnapshot = (): RelatedQuestion[] | null => null;

/**
 * Builds the shuffled questions on the client only. `useSyncExternalStore`
 * serves `null` during SSR and hydration, then swaps in the generated
 * questions, so the random order never differs between server and client.
 */
export const useRelatedQuestions = (
  words: PracticeModeWords,
  field: RelatedField,
) => {
  const cacheRef = useRef<{
    words: PracticeModeWords;
    field: RelatedField;
    questions: RelatedQuestion[];
  } | null>(null);

  const getSnapshot = useCallback((): RelatedQuestion[] | null => {
    const cached = cacheRef.current;
    const isSameWordSet =
      cached !== null &&
      cached.field === field &&
      cached.words.length === words.length &&
      cached.words.every((word, index) => word.id === words[index].id);

    if (cached && isSameWordSet) return cached.questions;

    const questions = buildRelatedQuestions(words, field);
    cacheRef.current = { words, field, questions };
    return questions;
  }, [field, words]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
