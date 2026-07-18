import { z } from "zod";

export const aiFillFieldsSchema = z.object({
  translation: z.boolean(),
  description: z.boolean(),
  part_of_speech: z.boolean(),
  example: z.boolean(),
  synonyms: z.boolean(),
  antonyms: z.boolean(),
});

export type AiFillFields = z.infer<typeof aiFillFieldsSchema>;
