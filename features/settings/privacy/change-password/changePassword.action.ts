"use server";

import { getAuthenticatedUser } from "@/lib/supabase/getAuthenticatedUser";
import { safeParseInput } from "@/lib/utils/safeParseInput";
import { createClient } from "@/lib/supabase/server";
import {
  changePasswordSchema,
  type ChangePasswordValue,
} from "./changePassword.schema";

export const changePasswordAction = async (data: ChangePasswordValue) => {
  await getAuthenticatedUser();

  const parsed = safeParseInput({
    schema: changePasswordSchema,
    data,
  });

  if (!parsed.success) {
    return {
      status: "validation_error" as const,
      fieldErrors: parsed.fieldErrors,
    };
  }

  const supabase = await createClient();
  const { newPassword } = parsed.data;

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    console.error("Update password error:", error);
    return { status: "error" as const, message: error.message };
  }

  return { status: "success" as const };
};

export type ChangePasswordResult = Awaited<
  ReturnType<typeof changePasswordAction>
>;
