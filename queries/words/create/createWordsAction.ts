"use server";

import { createClient } from "@/lib/supabase/server";
import { getAuthenticatedUser } from "@/lib/supabase/getAuthenticatedUser";

import type { WordInsertPayload } from "@/schemas/word/word.schema";
import type { WordSource } from "@/types/db-aliases";
import { APP_LIMITS } from "@/constants/app-limits";

type CreateWordsActionProps = {
  categoryId: number;
  words: WordInsertPayload[];
  source?: WordSource;
};

export const createWordsAction = async ({
  categoryId,
  words,
  source,
}: CreateWordsActionProps) => {
  const supabase = await createClient();
  const user = await getAuthenticatedUser(supabase);

  const rows = words.map((word) => ({
    ...word,
    category_id: categoryId,
    user_id: user.id,
    source: source ?? "manual",
  }));

  const { data, error } = await supabase.from("words").insert(rows).select();

  if (error) {
    if (error.message.includes("WORD_LIMIT_REACHED")) {
      return {
        status: "limit_reached" as const,
        message: `You've reached the maximum limit of ${APP_LIMITS.word_limit_per_user} words.`,
      };
    }

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
