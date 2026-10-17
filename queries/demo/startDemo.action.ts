"use server";

import { createClient } from "@/lib/supabase/server";

const DEMO_USER_NAME = "Demo User";

export const startDemoAction = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const { data, error } = await supabase.auth.signInAnonymously({
      options: { data: { full_name: DEMO_USER_NAME } },
    });

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error("Anonymous sign-in returned no user.");
  }

  const { error: seedError } = await supabase.rpc("seed_demo_data");

  if (seedError) throw new Error(seedError.message);
};