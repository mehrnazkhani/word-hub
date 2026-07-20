import z from "zod";
import { addWordSchema } from "@/schemas/word/addWord.schema";

export const wordFormSettingsSchema = addWordSchema.pick({
  sourceLanguageId: true,
  targetLanguageId: true,
  categoryId: true,
});

export type WordFormSettingsValues = z.infer<typeof wordFormSettingsSchema>;
