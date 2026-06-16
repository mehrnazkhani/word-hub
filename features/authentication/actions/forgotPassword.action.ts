"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { ROUTES } from "@/constants/routes";

import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "../schemas/auth.schema";

export const forgotPasswordAction = async (data: ForgotPasswordFormValues) => {
  const validation = forgotPasswordSchema.safeParse(data);
  if (!validation.success) {
    const flattened = z.flattenError(validation.error);
    return {
      success: false,
      error: "Invalid form data",
      fieldErrors: flattened.fieldErrors,
    };
  }

  const { email } = validation.data;

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}${ROUTES.RESET_PASSWORD}`,
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
