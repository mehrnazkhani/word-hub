import { createClient } from "./server";
import { User } from "@supabase/supabase-js";

export const getAuthenticatedUser = async (): Promise<User> => {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Unauthorized");
  }

  return user;
};
