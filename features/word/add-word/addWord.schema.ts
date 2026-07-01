import { z } from "zod";
import type { Database } from "@/types/supabase";

type Language = Database["public"]["Tables"]["languages"]["Row"];
type Category = Database["public"]["Tables"]["categories"]["Row"];
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

const languageSchema = z.object({
  created_at: z.string(),
  flag: z.string().nullable(),
  id: z.number().int(),
  label: z.string().trim().min(1, "Language label is required."),
  user_id: z.string().nullable(),
  value: z.string().trim().min(1, "Language value is required."),
});

const categorySchema = z.object({
  created_at: z.string(),
  deleted_at: z.string().nullable(),
  id: z.number().int().positive(),
  name: z.string().trim().min(1, "Category name is required."),
  progress: z.number(),
  updated_at: z.string().nullable(),
  user_id: z.string().min(1, "Category user ID is required."),
});

const relatedWordSchema = z
  .string()
  .trim()
  .min(1, "This field cannot be empty.")
  .max(WORD_LIMITS.relatedWord);

export const addWordSchema = z.object({
  word: z.string().trim().min(1).max(WORD_LIMITS.word),
  translation: z.string().trim().min(1).max(WORD_LIMITS.translation),
  sourceLanguage: languageSchema.optional(),
  targetLanguage: languageSchema.optional(),
  wordType: partOfSpeechSchema.nullable().optional(),
  category: categorySchema.nullable().optional(),
  synonyms: z.array(relatedWordSchema).max(WORD_LIMITS.maxRelatedWords),
  antonyms: z.array(relatedWordSchema).max(WORD_LIMITS.maxRelatedWords),
  description: z.string().trim().max(WORD_LIMITS.description).optional(),
});

export type AddWordFormValues = z.infer<typeof addWordSchema>;

export const addWordFormDefaultValues: AddWordFormValues = {
  word: "",
  translation: "",
  sourceLanguage: undefined,
  targetLanguage: undefined,
  wordType: undefined,
  category: undefined,
  synonyms: [],
  antonyms: [],
  description: "",
};
