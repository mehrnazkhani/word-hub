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

  const { data, error } = await supabase.rpc("create_words_skip_duplicates", {
    p_category_id: categoryId,
    p_source: source ?? "manual",
    p_words: words,
  });

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

  const created = data ?? [];

  return {
    status: "success" as const,
    data: created,
    skipped: words.length - created.length,
  };
};
