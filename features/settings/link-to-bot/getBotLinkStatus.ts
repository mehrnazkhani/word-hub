import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

type Client = SupabaseClient<Database>;

export type BotLinkStatus = {
  isConnected: boolean;
  verifiedAt: string | null;
};

type Props = {
  client: Client;
  userId: string;
};

export const getBotLinkStatus = async ({
  client,
  userId,
}: Props): Promise<BotLinkStatus> => {
  const { data, error } = await client
    .from("telegram_links")
    .select("verified_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error("Could not fetch Bot link status");
  }

  return {
    isConnected: Boolean(data?.verified_at),
    verifiedAt: data?.verified_at ?? null,
  };
};
