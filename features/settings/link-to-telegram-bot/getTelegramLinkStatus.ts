import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

type Client = SupabaseClient<Database>;

export type TelegramLinkStatus = {
  isConnected: boolean;
  verifiedAt: string | null;
};

type Props = {
  client: Client;
  userId: string;
};

export const getTelegramLinkStatus = async ({
  client,
  userId,
}: Props): Promise<TelegramLinkStatus> => {
  const { data, error } = await client
    .from("telegram_links")
    .select("verified_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error("Could not fetch Telegram link status");
  }

  return {
    isConnected: Boolean(data?.verified_at),
    verifiedAt: data?.verified_at ?? null,
  };
};
