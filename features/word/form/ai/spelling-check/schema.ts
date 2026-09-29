import z from "zod";

export const spellingCheckInput = z.object({
  word: z.string().min(1),
  language: z.string().min(1),
  explanationLanguage: z.string().optional(),
});

export const spellingCheckOutput = z.object({
  isCorrect: z.boolean(),
  suggestions: z
    .array(z.object({ word: z.string(), explanation: z.string() }))
    .max(3),
});

export type SpellingCheckRequest = z.infer<typeof spellingCheckInput>;
export type SpellingCheckResponse = z.infer<typeof spellingCheckOutput>;
export type SpellingSuggestion = SpellingCheckResponse["suggestions"][number];
