import {
  ANTONYMS_PER_WORD,
  MAX_ANTONYM_OPTIONS,
  MAX_SYNONYM_OPTIONS,
  MIN_WORDS_REQUIRED,
  SYNONYMS_PER_WORD,
} from "@/constants/practice-modes";
import { shuffle } from "@/lib/utils/shuffle";
import type { PracticeModeWords } from "../../validatePracticeMode";
import type { RelatedField, RelatedQuestion } from "./types";

type Shuffle = <T>(items: readonly T[]) => T[];

const RELATED_LIMITS: Record<
  RelatedField,
  { perWord: number; maxOptions: number }
> = {
  synonyms: { perWord: SYNONYMS_PER_WORD, maxOptions: MAX_SYNONYM_OPTIONS },
  antonyms: { perWord: ANTONYMS_PER_WORD, maxOptions: MAX_ANTONYM_OPTIONS },
};

type RelatedWord = {
  id: number;
  word: string;
  related: string[];
};

const hasText = (value: string | null | undefined): value is string =>
  typeof value === "string" && value.trim().length > 0;

/** Trims, dedupes case-insensitively, and caps one word's related words. */
const toRelated = (
  values: PracticeModeWords[number][RelatedField],
  perWord: number,
) => {
  if (!Array.isArray(values)) return [];

  const unique = new Map<string, string>();

  for (const value of values) {
    if (!hasText(value)) continue;

    const label = value.trim();
    const key = label.toLowerCase();

    if (!unique.has(key)) unique.set(key, label);
  }

  return [...unique.values()].slice(0, perWord);
};

/**
 * Builds one question per selected word, using the word as the question and
 * its synonyms or antonyms as the correct answers. The remaining options are
 * randomly picked from the related words of the other selected words, up to
 * that field's maximum number of options.
 */
export const buildRelatedQuestions = (
  words: PracticeModeWords,
  field: RelatedField,
  shuffleItems: Shuffle = shuffle,
): RelatedQuestion[] => {
  const { perWord, maxOptions } = RELATED_LIMITS[field];
  const selectedWords = new Map<string, RelatedWord>();
  const relatedPool = new Map<string, string>();

  for (const word of words) {
    if (!hasText(word.word)) continue;

    const related = toRelated(word[field], perWord);
    if (related.length === 0) continue;

    const label = word.word.trim();
    const key = label.toLowerCase();

    if (selectedWords.has(key)) continue;

    selectedWords.set(key, { id: word.id, word: label, related });

    for (const value of related) {
      const relatedKey = value.toLowerCase();

      if (!relatedPool.has(relatedKey)) relatedPool.set(relatedKey, value);
    }
  }

  const uniqueWords = [...selectedWords.values()];

  if (uniqueWords.length < MIN_WORDS_REQUIRED) return [];

  const relatedEntries = [...relatedPool.entries()];

  return shuffleItems(uniqueWords).map((questionWord) => {
    const correctKeys = new Set(
      questionWord.related.map((value) => value.toLowerCase()),
    );

    const distractors = shuffleItems(
      relatedEntries.filter(([key]) => !correctKeys.has(key)),
    )
      .slice(0, maxOptions - questionWord.related.length)
      .map(([, label]) => label);

    return {
      id: questionWord.id,
      word: questionWord.word,
      related: questionWord.related,
      options: shuffleItems([...questionWord.related, ...distractors]),
    };
  });
};
