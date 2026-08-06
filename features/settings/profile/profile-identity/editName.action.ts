"use server";

import { getAuthenticatedUser } from "@/lib/supabase/getAuthenticatedUser";
import { safeParseInput } from "@/lib/utils/safeParseInput";
import { createClient } from "@/lib/supabase/server";
import { editNameSchema, type EditNameValue } from "./editName.schema";

export const editNameAction = async (data: EditNameValue) => {
  const supabase = await createClient();
  const user = await getAuthenticatedUser(supabase);

  const parsed = safeParseInput({
    schema: editNameSchema,
    data,
  });

  if (!parsed.success) {
    return {
      status: "validation_error" as const,
      fieldErrors: parsed.fieldErrors,
    };
  }

  const { name } = parsed.data;

  if (name === user.user_metadata?.full_name) {
    return {
      status: "validation_error" as const,
      fieldErrors: {
        name: ["New name must be different from your current name."],
      },
    };
  }

  const { error } = await supabase.auth.updateUser({
    data: { full_name: name },
  });

  if (error) {
    console.error("Update name error:", error);
    return { status: "error" as const, message: error.message };
  }

  return { status: "success" as const };
};

export type EditNameResult = Awaited<ReturnType<typeof editNameAction>>;
