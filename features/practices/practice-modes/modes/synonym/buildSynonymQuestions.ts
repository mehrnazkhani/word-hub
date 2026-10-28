import {
  MAX_SYNONYM_OPTIONS,
  MIN_WORDS_REQUIRED,
  SYNONYMS_PER_WORD,
} from "@/constants/practice-modes";
import { shuffle } from "@/lib/utils/shuffle";
import type { PracticeModeWords } from "../../validatePracticeMode";
import type { SynonymQuestion } from "./types";

type Shuffle = <T>(items: readonly T[]) => T[];

type SynonymWord = {
  id: number;
  word: string;
  synonyms: string[];
};

const hasText = (value: string | null | undefined): value is string =>
  typeof value === "string" && value.trim().length > 0;

/** Trims, dedupes case-insensitively, and caps the synonyms of one word. */
const toSynonyms = (values: PracticeModeWords[number]["synonyms"]) => {
  if (!Array.isArray(values)) return [];

  const unique = new Map<string, string>();

  for (const value of values) {
    if (!hasText(value)) continue;

    const label = value.trim();
    const key = label.toLowerCase();

    if (!unique.has(key)) unique.set(key, label);
  }

  return [...unique.values()].slice(0, SYNONYMS_PER_WORD);
};

/**
 * Builds one question per selected word, using the word as the question and
 * its synonyms as the correct answers. The remaining options are randomly
 * picked from the synonyms of the other selected words, up to a total of
 * `MAX_SYNONYM_OPTIONS` options.
 */
export const buildSynonymQuestions = (
  words: PracticeModeWords,
  shuffleItems: Shuffle = shuffle,
): SynonymQuestion[] => {
  const selectedWords = new Map<string, SynonymWord>();
  const synonymPool = new Map<string, string>();

  for (const word of words) {
    if (!hasText(word.word)) continue;

    const synonyms = toSynonyms(word.synonyms);
    if (synonyms.length === 0) continue;

    const label = word.word.trim();
    const key = label.toLowerCase();

    if (selectedWords.has(key)) continue;

    selectedWords.set(key, { id: word.id, word: label, synonyms });

    for (const synonym of synonyms) {
      const synonymKey = synonym.toLowerCase();

      if (!synonymPool.has(synonymKey)) synonymPool.set(synonymKey, synonym);
    }
  }

  const uniqueWords = [...selectedWords.values()];

  if (uniqueWords.length < MIN_WORDS_REQUIRED) return [];

  const synonymEntries = [...synonymPool.entries()];

  return shuffleItems(uniqueWords).map((questionWord) => {
    const correctKeys = new Set(
      questionWord.synonyms.map((synonym) => synonym.toLowerCase()),
    );

    const distractors = shuffleItems(
      synonymEntries.filter(([key]) => !correctKeys.has(key)),
    )
      .slice(0, MAX_SYNONYM_OPTIONS - questionWord.synonyms.length)
      .map(([, label]) => label);

    return {
      id: questionWord.id,
      word: questionWord.word,
      synonyms: questionWord.synonyms,
      options: shuffleItems([...questionWord.synonyms, ...distractors]),
    };
  });
};
