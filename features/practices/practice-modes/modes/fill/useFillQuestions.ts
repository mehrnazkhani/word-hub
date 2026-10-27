"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";

import { buildFillQuestions } from "./buildFillQuestions";
import type { PracticeModeWords } from "../../validatePracticeMode";
import type { FillQuestion } from "./types";

const subscribe = () => () => {};

const getServerSnapshot = (): FillQuestion[] | null => null;

/**
 * Builds the shuffled questions on the client only. `useSyncExternalStore`
 * serves `null` during SSR and hydration, then swaps in the generated
 * questions, so the random order never differs between server and client.
 */
export const useFillQuestions = (words: PracticeModeWords) => {
  const cacheRef = useRef<{
    words: PracticeModeWords;
    questions: FillQuestion[];
  } | null>(null);

  const getSnapshot = useCallback((): FillQuestion[] | null => {
    const cached = cacheRef.current;
    const isSameWordSet =
      cached !== null &&
      cached.words.length === words.length &&
      cached.words.every((word, index) => word.id === words[index].id);

    if (cached && isSameWordSet) return cached.questions;

    const questions = buildFillQuestions(words);
    cacheRef.current = { words, questions };
    return questions;
  }, [words]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
