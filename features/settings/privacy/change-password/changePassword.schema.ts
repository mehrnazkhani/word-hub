import { z } from "zod";
import {
  passwordField,
  confirmPasswordField,
} from "@/features/authentication/schemas/auth.schema";

export const changePasswordSchema = z
  .object({
    currentPassword: passwordField,
    newPassword: passwordField,
    confirmPassword: confirmPasswordField,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "New password must be different from your current password.",
    path: ["newPassword"],
  });

export type ChangePasswordValue = z.infer<typeof changePasswordSchema>;
