"use server";

import { EXTERNAL_ROUTES } from "@/constants/routes";
import { createClient } from "@/lib/supabase/server";

export const disconnectBotAction = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Please sign in first");
  }

  const { data: existing } = await supabase
    .from("telegram_links")
    .select("telegram_chat_id")
    .eq("user_id", user.id)
    .maybeSingle();

  const { error } = await supabase
    .from("telegram_links")
    .update({
      telegram_chat_id: null,
      telegram_user_id: null,
      verified_at: null,
    })
    .eq("user_id", user.id);

  if (error) {
    console.error("Supabase disconnect error:", error);
    throw new Error("Something went wrong, please try again");
  }

  if (existing?.telegram_chat_id) {
    try {
      await fetch(
        EXTERNAL_ROUTES.TELEGRAM_API(
          process.env.TELEGRAM_BOT_TOKEN!,
          "sendMessage",
        ),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: existing.telegram_chat_id,
            text: "Your account has been disconnected from the app.",
          }),
        },
      );
    } catch (err) {
      console.error("Failed to send Bot disconnect message:", err);
    }
  }

  return { isConnected: false };
};
