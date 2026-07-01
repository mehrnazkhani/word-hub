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

const relatedWordsSchema = z
  .union([z.string(), z.array(z.string())])
  .transform((val) => {
    if (Array.isArray(val)) {
      return val.map((item) => item.trim()).filter(Boolean);
    }
    if (typeof val === "string") {
      return val
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }
    return [];
  })
  .pipe(
    z
      .array(z.string().trim().min(1, "Each word must not be empty"))
      .max(
        WORD_LIMITS.maxRelatedWords,
        `Maximum ${WORD_LIMITS.maxRelatedWords} related words are allowed`,
      ),
  );

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
  synonyms: relatedWordsSchema,
  antonyms: relatedWordsSchema,
  description: z
    .string()
    .trim()
    .max(WORD_LIMITS.description)
    .nullable()
    .optional(),
});

export type AddWordFormValues = z.input<typeof addWordSchema>;

export type AddWordParsedValues = z.infer<typeof addWordSchema>;

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
