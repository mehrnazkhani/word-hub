"use server";

import { EXTERNAL_ROUTES } from "@/constants/routes";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const connectTelegramAction = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Please sign in first");
  }

  const { data: existing } = await supabase
    .from("telegram_links")
    .select("verified_at")
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing?.verified_at) {
    throw new Error("Your Telegram account is already connected");
  }

  const { data: link, error } = await supabase
    .from("telegram_links")
    .upsert(
      {
        user_id: user.id,
        link_token: crypto.randomUUID(),
        token_expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
      },
      { onConflict: "user_id" },
    )
    .select("link_token")
    .single();

  if (error || !link) {
    console.error("Supabase upsert error:", error);
    throw new Error("Something went wrong, please try again");
  }

  redirect(
    EXTERNAL_ROUTES.TELEGRAM_BOT(
      process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME!,
      link.link_token,
    ),
  );
};
