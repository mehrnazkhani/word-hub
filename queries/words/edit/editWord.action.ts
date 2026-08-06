"use server";

import { getAuthenticatedUser } from "@/lib/supabase/getAuthenticatedUser";
import { createClient } from "@/lib/supabase/server";
import { safeParseInput } from "@/lib/utils/safeParseInput";
import {
  wordDbSchema,
  type EditWordFormValues,
} from "@/schemas/word/word.schema";

export type editWordActionProps = {
  wordId: number;
  formData: EditWordFormValues;
};

export const editWordAction = async ({
  wordId,
  formData,
}: editWordActionProps) => {
  const supabase = await createClient();
  const user = await getAuthenticatedUser(supabase);
  const userId = user.id;

  const parsed = safeParseInput({
    schema: wordDbSchema,
    data: formData,
  });

  if (!parsed.success) {
    return {
      status: "validation_error",
      fieldErrors: parsed.fieldErrors,
    };
  }

  const { category_id, ...updateData } = parsed.data;

  const { data, error } = await supabase
    .from("words")
    .update(updateData)
    .eq("id", wordId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    return {
      status: "error" as const,
      message: error.message,
    };
  }

  return {
    status: "success" as const,
    data,
  };
};
