"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signUpSchema, type SignUpFormValues } from "../schemas/auth.schema";
import { z } from "zod";

export async function signUpAction(data: SignUpFormValues) {
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

  if (authData.user && !authData.user.email_confirmed_at) {
    return {
      success: true,
      message: "Please check your email to confirm your account.",
      requiresEmailConfirmation: true,
    };
  }

  revalidatePath("/");
  redirect("/");
}
