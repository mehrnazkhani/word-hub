import { z } from "zod";
import { PARTS_OF_SPEECH, WORD_LIMITS, splitRelatedWords } from "./word.shared";

export const wordInsertSchema = z.object({
  word: z.string().trim().min(1).max(WORD_LIMITS.word),
  translation: z.string().trim().min(1).max(WORD_LIMITS.translation),

  description: z.string().trim().max(WORD_LIMITS.description).nullable(),
  example: z.string().trim().max(WORD_LIMITS.example),

  part_of_speech: z.enum(PARTS_OF_SPEECH).nullable(),

  category_id: z
    .string()
    .nullable()
    .transform((v) => (v ? Number(v) : null)),

  source_language_id: z.string().transform(Number),
  target_language_id: z.string().transform(Number),

  synonyms: z
    .string()
    .transform(splitRelatedWords)
    .pipe(
      z
        .array(z.string().max(WORD_LIMITS.relatedWord))
        .max(WORD_LIMITS.maxRelatedWords),
    ),

  antonyms: z
    .string()
    .transform(splitRelatedWords)
    .pipe(
      z
        .array(z.string().max(WORD_LIMITS.relatedWord))
        .max(WORD_LIMITS.maxRelatedWords),
    ),
});

export type WordInsert = z.infer<typeof wordInsertSchema>;
