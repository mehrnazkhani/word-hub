"use server";

import { createClient } from "@/lib/supabase/server";
import { signInSchema, type SignInFormValues } from "../schemas/auth.schema";
import { safeParseInput } from "../lib/safeParseInput";

export const signInAction = async (data: SignInFormValues) => {
  const parsed = safeParseInput({
    schema: signInSchema,
    data,
  });

  if (!parsed.success) return parsed;

  const { email, password } = parsed.data;

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error?.message.includes("Email not confirmed")) {
      return {
        success: false,
        requiresEmailConfirmation: true,
      };
    }

    return {
      success: false,
      error: "Invalid email or password",
    };
  }

  return {
    success: true,
  };
};
