"use server";

import { createClient } from "@/lib/supabase/server";
import { signInSchema, type SignInFormValues } from "../schemas/auth.schema";
import { z } from "zod";

export const signInAction = async (data: SignInFormValues) => {
  const validationData = signInSchema.safeParse(data);
  if (!validationData.success) {
    const flattened = z.flattenError(validationData.error);
    return {
      success: false,
      error: "Invalid form data",
      fieldErrors: flattened.fieldErrors,
    };
  }

  const { email, password } = validationData.data;

  const supabase = await createClient();
  const { data: authData, error } = await supabase.auth.signInWithPassword({
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
