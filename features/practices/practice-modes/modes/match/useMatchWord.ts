"use client";

import { useEffect, useMemo, useReducer } from "react";
import type { MatchStatus } from "./types";
import type { PracticeModeWords } from "../../validatePracticeMode";
import { shuffle } from "@/lib/utils/shuffle";

const PAGE_SIZE = 5;
const FEEDBACK_DELAY_MS = 700;

type State = {
  selectedWord: number | null;
  selectedTranslation: number | null;
  matchStatuses: Record<number, MatchStatus>;
  // Tracked per column because both columns share word ids: a wrong word
  // answer must not also turn its translation red on the other side.
  incorrectWordId: number | null;
  incorrectTranslationId: number | null;
  incorrectCount: number;
  page: number;
};

type Action =
  | { type: "select_word"; id: number }
  | { type: "select_translation"; id: number }
  | { type: "clear_incorrect" }
  | { type: "next_page" };

export const initialState: State = {
  selectedWord: null,
  selectedTranslation: null,
  matchStatuses: {},
  incorrectWordId: null,
  incorrectTranslationId: null,
  incorrectCount: 0,
  page: 0,
};

// If both sides are selected, decide whether it's a match.
function resolveSelection(state: State): State {
  const { selectedWord, selectedTranslation } = state;
  if (selectedWord === null || selectedTranslation === null) return state;

  if (selectedWord === selectedTranslation) {
    return {
      ...state,
      matchStatuses: { ...state.matchStatuses, [selectedWord]: "correct" },
      selectedWord: null,
      selectedTranslation: null,
    };
  }

  return {
    ...state,
    incorrectCount: state.incorrectCount + 1,
    // Only these two buttons flash red; replacing the ids also means a
    // newer mistake supersedes the previous one.
    incorrectWordId: selectedWord,
    incorrectTranslationId: selectedTranslation,
    // Selections are cleared immediately so the user can keep playing
    // while the red feedback is still visible.
    selectedWord: null,
    selectedTranslation: null,
  };
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "select_word": {
      if (state.matchStatuses[action.id] === "correct") return state;
      const selectedWord = state.selectedWord === action.id ? null : action.id;
      return resolveSelection({ ...state, selectedWord });
    }

    case "select_translation": {
      if (state.matchStatuses[action.id] === "correct") return state;
      const selectedTranslation =
        state.selectedTranslation === action.id ? null : action.id;
      return resolveSelection({ ...state, selectedTranslation });
    }

    case "clear_incorrect":
      return { ...state, incorrectWordId: null, incorrectTranslationId: null };

    case "next_page":
      return {
        ...state,
        page: state.page + 1,
        selectedWord: null,
        selectedTranslation: null,
        incorrectWordId: null,
        incorrectTranslationId: null,
      };

    default:
      return state;
  }
}

export const useMatchWord = (shuffledWords: PracticeModeWords) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    selectedWord,
    selectedTranslation,
    matchStatuses,
    incorrectWordId,
    incorrectTranslationId,
    incorrectCount,
    page,
  } = state;

  const visibleWords = useMemo(
    () => shuffledWords.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
    [shuffledWords, page],
  );

  const visibleTranslations = useMemo(
    () => shuffle(visibleWords),
    [visibleWords],
  );

  const matchedCount = useMemo(
    () => shuffledWords.filter((w) => matchStatuses[w.id] === "correct").length,
    [shuffledWords, matchStatuses],
  );

  const isPracticeCompleted = matchedCount === shuffledWords.length;

  const hasIncorrect =
    incorrectWordId !== null || incorrectTranslationId !== null;

  const allPageMatched = visibleWords.every(
    (w) => matchStatuses[w.id] === "correct",
  );
  const hasNextPage = (page + 1) * PAGE_SIZE < shuffledWords.length;

  // Side effect 1: remove red feedback shortly after the last mistake.
  useEffect(() => {
    if (!hasIncorrect) return;
    const timer = setTimeout(
      () => dispatch({ type: "clear_incorrect" }),
      FEEDBACK_DELAY_MS,
    );
    return () => clearTimeout(timer);
  }, [hasIncorrect, incorrectCount]);

  // Side effect 2: go to the next page after the current page is fully matched.
  useEffect(() => {
    if (!allPageMatched || !hasNextPage) return;
    const timer = setTimeout(
      () => dispatch({ type: "next_page" }),
      FEEDBACK_DELAY_MS,
    );
    return () => clearTimeout(timer);
  }, [allPageMatched, hasNextPage]);

  const handleWordSelect = (id: number) =>
    dispatch({ type: "select_word", id });
  const handleTranslationSelect = (id: number) =>
    dispatch({ type: "select_translation", id });

  return {
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
  };
};
