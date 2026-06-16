"use server";

import { createClient } from "@/lib/supabase/server";
import { safeParseInput } from "../lib/safeParseInput";

import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "../schemas/auth.schema";

export const resetPasswordAction = async (data: ResetPasswordFormValues) => {
  const parsed = safeParseInput({
    schema: resetPasswordSchema,
    data,
  });

  if (!parsed.success) return parsed;

  const { password } = parsed.data;

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    console.error("Reset password error:", error);

    return {
      success: false,

      error: error.message.includes("Password")
        ? "Password must be at least 6 characters long"
        : "An error occurred while changing your password. Please try again.",
    };
  }

  return {
    success: true,
    message: "Your password has been changed successfully.",
  };
};
