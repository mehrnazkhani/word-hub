import { z } from "zod";

export const posCheckInput = z.object({
  word: z.string().min(1),
  language: z.string().min(1),
  partOfSpeech: z.string().nullish(),
});

export const posCheckOutput = z.object({
  isValid: z.boolean(),
  availablePos: z.array(z.object({ pos: z.string(), meaning: z.string() })),
});

export type PosCheckRequest = z.infer<typeof posCheckInput>;
export type PosCheckResponse = z.infer<typeof posCheckOutput>;
export type PosItem = PosCheckResponse["availablePos"][number];
