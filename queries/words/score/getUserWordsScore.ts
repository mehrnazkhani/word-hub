import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

type Client = SupabaseClient<Database>;

type GetUserWordsScoreProps = {
  client: Client;
  userId: string;
};

export const getUserWordsScore = async ({
  client,
  userId,
}: GetUserWordsScoreProps) => {
  return client.from("words").select("score").eq("user_id", userId);
};
