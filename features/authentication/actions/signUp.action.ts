"use server";

import { createClient } from "@/lib/supabase/server";
import { safeParseInput } from "../lib/safeParseInput";
import { signUpSchema, type SignUpFormValues } from "../schemas/auth.schema";

export const signUpAction = async (data: SignUpFormValues) => {
  const parsed = safeParseInput({
    schema: signUpSchema,
    data,
  });

  if (!parsed.success) return parsed;

  const { name, email, password } = parsed.data;

  const supabase = await createClient();

  const { data: authData, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (error) {
    console.error("Supabase signup error:", error);
    return {
      success: false,
      error: error.message,
    };
  }

  if (!authData.user?.email_confirmed_at) {
    return {
      success: true,
      requiresEmailConfirmation: true,
    };
  }

  return {
    success: true,
    requiresEmailConfirmation: false,
  };
};
