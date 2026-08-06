"use server";

import { getAuthenticatedUser } from "@/lib/supabase/getAuthenticatedUser";
import { safeParseInput } from "@/lib/utils/safeParseInput";
import { createClient } from "@/lib/supabase/server";
import { changeEmailSchema, type ChangeEmailValue } from "./changeEmail.schema";

export const changeEmailAction = async (data: ChangeEmailValue) => {
  const supabase = await createClient();
  const user = await getAuthenticatedUser(supabase);

  const parsed = safeParseInput({
    schema: changeEmailSchema,
    data,
  });

  if (!parsed.success) {
    return {
      status: "validation_error" as const,
      fieldErrors: parsed.fieldErrors,
    };
  }

  const { newEmail } = parsed.data;

  if (newEmail === user.email) {
    return {
      status: "validation_error" as const,
      fieldErrors: {
        newEmail: ["New email must be different from your current email."],
      },
    };
  }

  const { error } = await supabase.auth.updateUser({
    email: newEmail,
  });

  if (error) {
    console.error("Update email error:", error);
    return { status: "error" as const, message: error.message };
  }

  return { status: "success" as const };
};

export type ChangeEmailResult = Awaited<ReturnType<typeof changeEmailAction>>;
