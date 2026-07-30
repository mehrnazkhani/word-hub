import { z } from "zod";
import { PARTS_OF_SPEECH, WORD_LIMITS, splitRelatedWords } from "./word.shared";

const relatedWordsSchema = z
  .string()
  .transform(splitRelatedWords)
  .pipe(
    z
      .array(z.string().max(WORD_LIMITS.relatedWord))
      .max(WORD_LIMITS.maxRelatedWords),
  );

export const wordBaseSchema = z.object({
  word: z.string().trim().min(1).max(WORD_LIMITS.word),
  translation: z.string().trim().min(1).max(WORD_LIMITS.translation),
  partOfSpeech: z.enum(PARTS_OF_SPEECH).nullable().optional(),
  sourceLanguageId: z.string().min(1),
  targetLanguageId: z.string().min(1),
  categoryId: z.string().nullable().optional(),
  example: z.string().trim().max(WORD_LIMITS.example).nullable().optional(),
  description: z
    .string()
    .trim()
    .max(WORD_LIMITS.description)
    .nullable()
    .optional(),
  synonyms: z.string().optional(),
  antonyms: z.string().optional(),
});

export const addWordFormSchema = wordBaseSchema.extend({
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
export type AddWordFormValues = z.infer<typeof addWordFormSchema>;

export const wordDbSchema = addWordFormSchema.transform((data) => ({
  word: data.word,
  translation: data.translation,
  part_of_speech: data.partOfSpeech ?? null,
  source_language_id: Number(data.sourceLanguageId),
  target_language_id: Number(data.targetLanguageId),
  category_id: data.categoryId ? Number(data.categoryId) : null,
  example: data.example ?? null,
  description: data.description ?? null,
  synonyms: splitRelatedWords(data.synonyms ?? ""),
  antonyms: splitRelatedWords(data.antonyms ?? ""),
}));
export type WordInsertPayload = z.infer<typeof wordDbSchema>;

export const aiWordSchema = wordBaseSchema.pick({
  translation: true,
  partOfSpeech: true,
  synonyms: true,
  antonyms: true,
  example: true,
  description: true,
});
export type AIWordValues = z.infer<typeof aiWordSchema>;

export const wordFormSettingsSchema = wordBaseSchema.pick({
  sourceLanguageId: true,
  targetLanguageId: true,
  categoryId: true,
});
export type WordFormSettingsValues = z.infer<typeof wordFormSettingsSchema>;

export const importWordSchema = wordDbSchema;
export type ImportWord = WordInsertPayload;
