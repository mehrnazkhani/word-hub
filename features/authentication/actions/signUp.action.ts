"use server";

import { createClient } from "@/lib/supabase/server";
import { signUpSchema, type SignUpFormValues } from "../schemas/auth.schema";
import { z } from "zod";

export const signUpAction = async (data: SignUpFormValues) => {
  const validationData = signUpSchema.safeParse(data);
  if (!validationData.success) {
    const flattened = z.flattenError(validationData.error);
    return {
      success: false,
      error: "Invalid form data",
      fieldErrors: flattened.fieldErrors,
    };
  }

  const { name, email, password } = validationData.data;

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
