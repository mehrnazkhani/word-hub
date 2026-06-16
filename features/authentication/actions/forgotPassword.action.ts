"use server";

import { createClient } from "@/lib/supabase/server";
import { safeParseInput } from "../lib/safeParseInput";
import { ROUTES } from "@/constants/routes";

import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "../schemas/auth.schema";

export const forgotPasswordAction = async (data: ForgotPasswordFormValues) => {
  const parsed = safeParseInput({
    schema: forgotPasswordSchema,
    data,
  });

  if (!parsed.success) return parsed;

  const { email } = parsed.data;

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}${ROUTES.AUTH_CONFIRM}`,
  });

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
    message:
      "If an account exists for this email, a password reset link has been sent.",
  };
};
