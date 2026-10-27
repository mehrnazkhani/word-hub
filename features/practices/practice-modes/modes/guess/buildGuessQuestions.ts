import { MIN_WORDS_REQUIRED } from "@/constants/practice-modes";
import { shuffle } from "@/lib/utils/shuffle";
import type { PracticeModeWords } from "../../validatePracticeMode";
import type { GuessQuestion, GuessQuestionOption } from "./types";

export const OPTIONS_PER_QUESTION = 4;

type Shuffle = <T>(items: readonly T[]) => T[];

type GuessWord = {
  id: number;
  word: string;
  description: string;
};

const hasText = (value: string | null | undefined): value is string =>
  typeof value === "string" && value.trim().length > 0;

/**
 * Builds one question per selected word, using its description as the
 * question and the word itself as the correct answer. Distractors are
 * randomly picked from the same selected words.
 */
export const buildGuessQuestions = (
  words: PracticeModeWords,
  shuffleItems: Shuffle = shuffle,
): GuessQuestion[] => {
  const selectedWords = new Map<string, GuessWord>();

  for (const word of words) {
    if (!hasText(word.word) || !hasText(word.description)) continue;

    const label = word.word.trim();
    const key = label.toLowerCase();

    if (!selectedWords.has(key)) {
      selectedWords.set(key, {
        id: word.id,
        word: label,
        description: word.description.trim(),
      });
    }
  }

  const uniqueWords = [...selectedWords.values()];

  if (uniqueWords.length < MIN_WORDS_REQUIRED) return [];

  const guesses = shuffleItems(uniqueWords);

  return guesses.map((questionWord) => {
    const distractors = shuffleItems(
      guesses.filter((word) => word.id !== questionWord.id),
    ).slice(0, OPTIONS_PER_QUESTION - 1);

    const options = shuffleItems<GuessQuestionOption>([
      { id: questionWord.id, word: questionWord.word },
      ...distractors.map((word) => ({ id: word.id, word: word.word })),
    ]);

    return {
      id: questionWord.id,
      description: questionWord.description,
      options,
      correctOptionId: questionWord.id,
    };
  });
};
