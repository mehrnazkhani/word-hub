import z from "zod";

export const addWordFormSettingsSchema = z.object({
  defaultSourceLanguage: z.string().nullable().optional(),
  defaultTargetLanguage: z.string().nullable().optional(),
  defaultCategoryId: z.string().nullable().optional(),
});

export type AddWordFormSettingsValues = z.infer<
  typeof addWordFormSettingsSchema
>;
