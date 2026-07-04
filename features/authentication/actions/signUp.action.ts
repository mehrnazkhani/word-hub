"use server";

import { createClient } from "@/lib/supabase/server";
import { signUpSchema, type SignUpFormValues } from "../schemas/auth.schema";
import { safeParseInput } from "../lib/safeParseInput";
import { ROUTES } from "@/constants/routes";
import type { SignUpResult } from "../auth.type";

export const signUpAction = async (
  data: SignUpFormValues,
): Promise<SignUpResult> => {
  const parsed = safeParseInput({
    schema: signUpSchema,
    data,
  });

  if (!parsed.success) {
    return {
      status: "validation_error",
      fieldErrors: parsed.fieldErrors,
    };
  }

  const { name, email, password } = parsed.data;

  const supabase = await createClient();

  const { data: authData, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.AUTH_CONFIRM}`,
    },
  });

  if (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  if (!authData.user?.email_confirmed_at) {
    return {
      status: "email_confirmation_required",
      email,
    };
  }

  return {
    status: "success",
  };
};
