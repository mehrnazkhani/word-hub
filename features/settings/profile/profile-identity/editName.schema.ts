import { z } from "zod";
import { nameField } from "@/features/authentication/schemas/auth.schema";

export const editNameSchema = z.object({
  name: nameField,
});

export type EditNameValue = z.infer<typeof editNameSchema>;
