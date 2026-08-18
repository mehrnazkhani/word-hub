import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

type Client = SupabaseClient<Database>;

type GetWeeklyPracticesProps = {
  client: Client;
  userId: string;
};

export const getWeeklyPractices = async ({
  client,
  userId,
}: GetWeeklyPracticesProps) => {
  const sevenDaysAgo = new Date();

  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return client
    .from("practices")
    .select(`*, category:categories(name)`)
    .eq("user_id", userId)
    .gte("created_at", sevenDaysAgo.toISOString())
    .order("created_at", { ascending: true });
};
