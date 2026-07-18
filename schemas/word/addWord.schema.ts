import { z } from "zod";
import { PARTS_OF_SPEECH, WORD_LIMITS } from "./word.shared";

export const addWordSchema = z.object({
  word: z
    .string()
    .trim()
    .min(1, { message: "" })
    .max(WORD_LIMITS.word, {
      message: `Word must be less than ${WORD_LIMITS.word} characters`,
    }),
  translation: z
    .string()
    .trim()
    .min(1, { message: "" })
    .max(WORD_LIMITS.translation, {
      message: `Translation must be less than ${WORD_LIMITS.translation} characters`,
    }),

  sourceLanguageId: z.string().min(1, { message: "" }),
  targetLanguageId: z.string().min(1, { message: "" }),

  partOfSpeech: z.enum(PARTS_OF_SPEECH).nullable().optional(),
  categoryId: z.string().nullable().optional(),

  synonyms: z.string().optional(),
  antonyms: z.string().optional(),

  example: z
    .string()
    .trim()
    .max(WORD_LIMITS.example, {
      message: `Example must be less than ${WORD_LIMITS.example} characters`,
    })
    .nullable()
    .optional(),

  description: z
    .string()
    .trim()
    .max(WORD_LIMITS.description, {
      message: `Description must be less than ${WORD_LIMITS.description} characters`,
    })
    .nullable()
    .optional(),
});

export type AddWordFormValues = z.infer<typeof addWordSchema>;
