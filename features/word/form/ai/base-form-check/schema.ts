import { z } from "zod";

export const baseFormCheckInput = z.object({
  word: z.string().min(1).max(100),
  language: z.string().min(1),
});

export const baseFormCheckOutput = z.object({
  isBaseForm: z.boolean(),
  formDescription: z.string(),
  baseForm: z.string(),
});

export type BaseFormCheckRequest = z.infer<typeof baseFormCheckInput>;
export type BaseFormCheckResponse = z.infer<typeof baseFormCheckOutput>;
