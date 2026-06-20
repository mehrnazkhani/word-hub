"use server";

import { createClient } from "@/lib/supabase/server";
import { safeParseInput } from "../lib/safeParseInput";
import { ROUTES } from "@/constants/routes";
import type { ActionResult } from "../auth.type";

import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "../schemas/auth.schema";

export const forgotPasswordAction = async (
  data: ForgotPasswordFormValues,
): Promise<ActionResult> => {
  const parsed = safeParseInput({
    schema: forgotPasswordSchema,
    data,
  });

  if (!parsed.success) {
    return {
      status: "validation_error",
      fieldErrors: parsed.fieldErrors,
    };
  }

  const { email } = parsed.data;

  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}${ROUTES.AUTH_CONFIRM}`,
  });

  if (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  return {
    status: "success",
  };
};
