"use server";

import { createClient } from "@/lib/supabase/server";
import { safeParseInput } from "../../../lib/utils/safeParseInput";
import type { ResetPasswordResult } from "../auth.type";

import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "../schemas/auth.schema";

export const resetPasswordAction = async (
  data: ResetPasswordFormValues,
): Promise<ResetPasswordResult> => {
  const parsed = safeParseInput({
    schema: resetPasswordSchema,
    data,
  });

  if (!parsed.success) {
    return {
      status: "validation_error",
      fieldErrors: parsed.fieldErrors,
    };
  }

  const { password } = parsed.data;

  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return {
      status: "error",
      message: error.message.includes("Password")
        ? "Password must be at least 6 characters long"
        : "An error occurred while changing your password. Please try again.",
    };
  }

  return {
    status: "success",
  };
};
