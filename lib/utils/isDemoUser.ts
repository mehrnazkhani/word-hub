import type { User } from "@supabase/supabase-js";

export const isDemoUser = (user?: User | null): boolean =>
  user?.is_anonymous === true;
