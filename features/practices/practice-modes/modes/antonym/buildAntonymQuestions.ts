import {
  ANTONYMS_PER_WORD,
  MAX_ANTONYM_OPTIONS,
  MIN_WORDS_REQUIRED,
} from "@/constants/practice-modes";
import { shuffle } from "@/lib/utils/shuffle";
import type { PracticeModeWords } from "../../validatePracticeMode";
import type { AntonymQuestion } from "./types";

type Shuffle = <T>(items: readonly T[]) => T[];

type AntonymWord = {
  id: number;
  word: string;
  antonyms: string[];
};

const hasText = (value: string | null | undefined): value is string =>
  typeof value === "string" && value.trim().length > 0;

/** Trims, dedupes case-insensitively, and caps the antonyms of one word. */
const toAntonyms = (values: PracticeModeWords[number]["antonyms"]) => {
  if (!Array.isArray(values)) return [];

  const unique = new Map<string, string>();

  for (const value of values) {
    if (!hasText(value)) continue;

    const label = value.trim();
    const key = label.toLowerCase();

    if (!unique.has(key)) unique.set(key, label);
  }

  return [...unique.values()].slice(0, ANTONYMS_PER_WORD);
};

/**
 * Builds one question per selected word, using the word as the question and
 * its antonyms as the correct answers. The remaining options are randomly
 * picked from the antonyms of the other selected words, up to a total of
 * `MAX_ANTONYM_OPTIONS` options.
 */
export const buildAntonymQuestions = (
  words: PracticeModeWords,
  shuffleItems: Shuffle = shuffle,
): AntonymQuestion[] => {
  const selectedWords = new Map<string, AntonymWord>();
  const antonymPool = new Map<string, string>();

  for (const word of words) {
    if (!hasText(word.word)) continue;

    const antonyms = toAntonyms(word.antonyms);
    if (antonyms.length === 0) continue;

    const label = word.word.trim();
    const key = label.toLowerCase();

    if (selectedWords.has(key)) continue;

    selectedWords.set(key, { id: word.id, word: label, antonyms });

    for (const antonym of antonyms) {
      const antonymKey = antonym.toLowerCase();

      if (!antonymPool.has(antonymKey)) antonymPool.set(antonymKey, antonym);
    }
  }

  const uniqueWords = [...selectedWords.values()];

  if (uniqueWords.length < MIN_WORDS_REQUIRED) return [];

  const antonymEntries = [...antonymPool.entries()];

  return shuffleItems(uniqueWords).map((questionWord) => {
    const correctKeys = new Set(
      questionWord.antonyms.map((antonym) => antonym.toLowerCase()),
    );

    const distractors = shuffleItems(
      antonymEntries.filter(([key]) => !correctKeys.has(key)),
    )
      .slice(0, MAX_ANTONYM_OPTIONS - questionWord.antonyms.length)
      .map(([, label]) => label);

    return {
      id: questionWord.id,
      word: questionWord.word,
      antonyms: questionWord.antonyms,
      options: shuffleItems([...questionWord.antonyms, ...distractors]),
    };
  });
};
