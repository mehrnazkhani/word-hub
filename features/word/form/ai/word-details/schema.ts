import { PARTS_OF_SPEECH } from "@/schemas/word/word.shared";
import { z } from "zod";

export const wordDetailsInput = z.object({
  word: z.string().min(1),
  sourceLanguage: z.string().min(1),
  targetLanguage: z.string().min(1),
});

export const wordDetailsOutput = z.object({
  translation: z.string().describe("Translation of the word"),
  partOfSpeech: z
    .enum([...PARTS_OF_SPEECH, ""])
    .describe("One of the allowed parts of speech, or empty string if unknown"),
  synonyms: z.string().describe("Comma-separated synonyms, or empty string"),
  antonyms: z.string().describe("Comma-separated antonyms, or empty string"),
  example: z.string().describe("One natural example sentence, or empty string"),
  description: z.string().describe("Short explanation, or empty string"),
});

export type WordDetailsRequest = z.infer<typeof wordDetailsInput>;
export type WordDetailsResponse = z.infer<typeof wordDetailsOutput>;
