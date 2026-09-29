import { PARTS_OF_SPEECH } from "@/schemas/word/word.shared";
import { z } from "zod";

export const wordDetailsInput = z.object({
  word: z.string().min(1),
  sourceLanguage: z.string().min(1),
  targetLanguage: z.string().min(1),
});

export const wordDetailsOutput = z.object({
  translation: z.string(),
  partOfSpeech: z.enum(PARTS_OF_SPEECH).or(z.literal("")),
  synonyms: z.string(),
  antonyms: z.string(),
  example: z.string(),
  description: z.string(),
});

export type WordDetailsRequest = z.infer<typeof wordDetailsInput>;
export type WordDetailsResponse = z.infer<typeof wordDetailsOutput>;
