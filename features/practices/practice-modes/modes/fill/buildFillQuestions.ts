import {
  MIN_WORDS_REQUIRED,
  OPTIONS_PER_QUESTION,
} from "@/constants/practice-modes";
import { shuffle } from "@/lib/utils/shuffle";
import type { PracticeModeWords } from "../../validatePracticeMode";
import type { FillQuestion, FillQuestionOption } from "./types";

type Shuffle = <T>(items: readonly T[]) => T[];

type FillWord = {
  id: number;
  word: string;
  example: string;
};

type BlankedExample = {
  exampleBefore: string;
  exampleAfter: string;
};

const hasText = (value: string | null | undefined): value is string =>
  typeof value === "string" && value.trim().length > 0;

const LETTER_PATTERN = new RegExp("\\p{L}", "u");

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const isLetter = (char: string | undefined) =>
  char !== undefined && LETTER_PATTERN.test(char);

/**
 * Blanks out the first whole-word occurrence of `word` in `example`,
 * skipping partial matches such as "run" inside "running".
 */
const blankOutWord = (
  example: string,
  word: string,
): BlankedExample | null => {
  const pattern = new RegExp(escapeRegExp(word), "gi");

  let match: RegExpExecArray | null;

  while ((match = pattern.exec(example)) !== null) {
    const before = example.slice(0, match.index);
    const after = example.slice(match.index + match[0].length);

    if (isLetter(before.slice(-1)) || isLetter(after.charAt(0))) continue;

    return { exampleBefore: before, exampleAfter: after };
  }

  return null;
};

/**
 * Builds one question per selected word, using its example sentence with
 * the word blanked out as the question and the word itself as the correct
 * answer. Distractors are randomly picked from the same selected words.
 */
export const buildFillQuestions = (
  words: PracticeModeWords,
  shuffleItems: Shuffle = shuffle,
): FillQuestion[] => {
  const selectedWords = new Map<string, FillWord>();

  for (const word of words) {
    if (!hasText(word.word) || !hasText(word.example)) continue;

    const label = word.word.trim();
    const key = label.toLowerCase();

    if (!selectedWords.has(key)) {
      selectedWords.set(key, {
        id: word.id,
        word: label,
        example: word.example.trim(),
      });
    }
  }

  const questions = shuffleItems(
    [...selectedWords.values()].flatMap((questionWord) => {
      const blank = blankOutWord(questionWord.example, questionWord.word);

      // The blank needs surrounding context to be answerable.
      if (!blank || (blank.exampleBefore === "" && blank.exampleAfter === "")) {
        return [];
      }

      return [{ ...questionWord, ...blank }];
    }),
  );

  if (questions.length < MIN_WORDS_REQUIRED) return [];

  return questions.map((questionWord) => {
    const distractors = shuffleItems(
      questions.filter((word) => word.id !== questionWord.id),
    ).slice(0, OPTIONS_PER_QUESTION - 1);

    const options = shuffleItems<FillQuestionOption>([
      { id: questionWord.id, word: questionWord.word },
      ...distractors.map((word) => ({ id: word.id, word: word.word })),
    ]);

    return {
      id: questionWord.id,
      exampleBefore: questionWord.exampleBefore,
      exampleAfter: questionWord.exampleAfter,
      options,
      correctOptionId: questionWord.id,
    };
  });
};
