import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

type Client = SupabaseClient<Database>;

type GetRecentPracticesProps = {
  client: Client;
  userId: string;
};

export const getRecentPractices = async ({
  client,
  userId,
}: GetRecentPracticesProps) => {
  return client
    .from("practices")
    .select(
      `*, category:categories(name)
    `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(5);
};
