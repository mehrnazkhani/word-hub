"use client";

import { useMemo, useState } from "react";
import type { MatchStatus } from "./types";
import type { PracticeModeWords } from "../../validatePracticeMode";

const PAGE_SIZE = 5;

export const useMatchWord = (shuffledWords: PracticeModeWords) => {
  const [selectedWord, setSelectedWord] = useState<number | null>(null);
  const [selectedTranslation, setSelectedTranslation] = useState<number | null>(
    null,
  );
  const [matchStatuses, setMatchStatuses] = useState<
    Record<number, MatchStatus>
  >({});
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [page, setPage] = useState(0);

  const visibleWords = shuffledWords.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE,
  );

  const visibleTranslations = useMemo(
    () => [...visibleWords].sort(() => Math.random() - 0.5),
    [page, shuffledWords],
  );

  const matchedCount = useMemo(
    () => shuffledWords.filter((w) => matchStatuses[w.id] === "correct").length,
    [shuffledWords, matchStatuses],
  );

  const isPracticeCompleted = useMemo(
    () => shuffledWords.every((w) => matchStatuses[w.id] === "correct"),
    [shuffledWords, matchStatuses],
  );

  const validate = (wordId: number, translationId: number) => {
    if (wordId === translationId) {
      const newStatuses = {
        ...matchStatuses,
        [wordId]: "correct" as MatchStatus,
      };
      setMatchStatuses(newStatuses);
      setSelectedWord(null);
      setSelectedTranslation(null);

      const allPageMatched = visibleWords
        .map((w) => w.id)
        .every((id) => newStatuses[id] === "correct");

      if (allPageMatched && (page + 1) * PAGE_SIZE < shuffledWords.length) {
        setTimeout(() => setPage((prev) => prev + 1), 500);
      }
    } else {
      setIncorrectCount((prev) => prev + 1);
      setMatchStatuses((prev) => ({
        ...prev,
        [wordId]: "incorrect",
        [translationId]: "incorrect",
      }));

      setTimeout(() => {
        setMatchStatuses((prev) => {
          const next = { ...prev };
          delete next[wordId];
          delete next[translationId];
          return next;
        });
        setSelectedWord(null);
        setSelectedTranslation(null);
      }, 500);
    }
  };

  const handleWordSelect = (id: number) => {
    const next = selectedWord === id ? null : id;
    setSelectedWord(next);
    if (next && selectedTranslation) validate(next, selectedTranslation);
  };

  const handleTranslationSelect = (id: number) => {
    const next = selectedTranslation === id ? null : id;
    setSelectedTranslation(next);
    if (selectedWord && next) validate(selectedWord, next);
  };

  return {
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
  };
};
