import { z } from "zod";
import { WORD_LIMITS, PARTS_OF_SPEECH } from "./addWord.schema";

export const wordInsertSchema = z.object({
  word: z.string().trim().min(1).max(WORD_LIMITS.word),
  translation: z.string().trim().min(1).max(WORD_LIMITS.translation),
  description: z.string().trim().max(WORD_LIMITS.description).nullable(),
  part_of_speech: z.enum(PARTS_OF_SPEECH).nullable(),
  category_id: z.number().int().positive().nullable(),

  synonyms: z
    .array(z.string().max(WORD_LIMITS.relatedWord))
    .max(WORD_LIMITS.maxRelatedWords),
  antonyms: z
    .array(z.string().max(WORD_LIMITS.relatedWord))
    .max(WORD_LIMITS.maxRelatedWords),

  source_language: z.string().min(1),
  target_language: z.string().min(1),
  source_flag: z.string(),
  target_flag: z.string(),
});

export type WordInsertValidated = z.infer<typeof wordInsertSchema>;
