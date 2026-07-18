import { z } from "zod";
import { PARTS_OF_SPEECH, WORD_LIMITS } from "./word.shared";

export const addWordSchema = z.object({
  word: z.string().trim().min(1).max(WORD_LIMITS.word),
  translation: z.string().trim().min(1).max(WORD_LIMITS.translation),

  sourceLanguageId: z.string().min(1),
  targetLanguageId: z.string().min(1),

  partOfSpeech: z.enum(PARTS_OF_SPEECH).nullable().optional(),
  categoryId: z.string().nullable().optional(),

  synonyms: z.string(),
  antonyms: z.string(),

  description: z
    .string()
    .trim()
    .max(WORD_LIMITS.description)
    .nullable()
    .optional(),

  example: z.string().trim().max(WORD_LIMITS.example).nullable().optional(),
});

export type AddWordFormValues = z.infer<typeof addWordSchema>;
