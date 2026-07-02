import { z } from "zod";
import type { Database } from "@/types/supabase";

type PartOfSpeech = Database["public"]["Enums"]["part_of_speech_enum"];

export const PARTS_OF_SPEECH = [
  "noun",
  "verb",
  "adjective",
  "adverb",
  "pronoun",
  "preposition",
  "conjunction",
  "interjection",
] as const satisfies readonly PartOfSpeech[];

const partOfSpeechSchema = z.enum(PARTS_OF_SPEECH);

export const WORD_LIMITS = {
  word: 45,
  translation: 200,
  description: 500,
  relatedWord: 45,
  maxRelatedWords: 3,
} as const;

export const splitRelatedWords = (value: string): string[] =>
  value
    .split(",")
    .map((w) => w.trim())
    .filter((w) => w.length > 0);

const relatedWordsField = (fieldLabel: string) =>
  z
    .string()
    .trim()
    .superRefine((value, ctx) => {
      if (!value) return;

      const words = splitRelatedWords(value);

      if (words.length > WORD_LIMITS.maxRelatedWords) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `You can add up to ${WORD_LIMITS.maxRelatedWords} ${fieldLabel}`,
        });
      }

      words.forEach((word, index) => {
        if (word.length > WORD_LIMITS.relatedWord) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `"${word}" exceeds ${WORD_LIMITS.relatedWord} characters`,
            path: [index],
          });
        }
      });
    });

export const addWordSchema = z.object({
  word: z.string().trim().min(1, "Word is required").max(WORD_LIMITS.word),

  translation: z
    .string()
    .trim()
    .min(1, "Translation is required")
    .max(WORD_LIMITS.translation),

  sourceLanguage: z.string().min(1, "Source language is required"),
  targetLanguage: z.string().min(1, "Target language is required"),

  partOfSpeech: partOfSpeechSchema.nullable().optional(),

  categoryId: z.string().nullable().optional(),

  synonyms: relatedWordsField("synonyms"),
  antonyms: relatedWordsField("antonyms"),

  description: z
    .string()
    .trim()
    .max(WORD_LIMITS.description)
    .nullable()
    .optional(),
});

export type AddWordFormValues = z.infer<typeof addWordSchema>;

export const addWordFormDefaultValues: AddWordFormValues = {
  word: "",
  translation: "",
  sourceLanguage: "",
  targetLanguage: "",
  partOfSpeech: null,
  categoryId: null,
  synonyms: "",
  antonyms: "",
  description: "",
};
