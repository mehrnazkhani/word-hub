import { z } from "zod";
import { emailField } from "@/features/authentication/schemas/auth.schema";

export const changeEmailSchema = z.object({
  newEmail: emailField,
});

export type ChangeEmailValue = z.infer<typeof changeEmailSchema>;
