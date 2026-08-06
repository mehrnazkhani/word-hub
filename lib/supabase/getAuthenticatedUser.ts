import type { SupabaseClient, User } from "@supabase/supabase-js";

export const getAuthenticatedUser = async (
  supabase: SupabaseClient,
): Promise<User> => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Unauthorized");
  }

  return user;
};
