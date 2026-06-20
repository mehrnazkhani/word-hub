"use server";

import { createClient } from "@/lib/supabase/server";
import { safeParseInput } from "../lib/safeParseInput";
import { signInSchema, type SignInFormValues } from "../schemas/auth.schema";
import type { SignInResult } from "../auth.type";

export const signInAction = async (
  data: SignInFormValues,
): Promise<SignInResult> => {
  const parsed = safeParseInput({
    schema: signInSchema,
    data,
  });

  if (!parsed.success) {
    return {
      status: "validation_error",
      fieldErrors: parsed.fieldErrors,
    };
  }

  const { email, password } = parsed.data;

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message.includes("Email not confirmed")) {
      return {
        status: "email_confirmation_required",
        email,
      };
    }

    return {
      status: "error",
      message: "Invalid email or password",
    };
  }

  return {
    status: "success",
  };
};
