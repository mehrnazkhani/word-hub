"use server";

import { createClient } from "@/lib/supabase/server";

const DEMO_USER_NAME = "Demo User";

/**
 * Starts the demo for the current visitor.
 *
 * @param captchaToken Cloudflare Turnstile token. Required by Supabase Auth as
 * soon as CAPTCHA is enabled, because anonymous sign-in is a signup request.
 */
export const startDemoAction = async (captchaToken?: string) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const { data, error } = await supabase.auth.signInAnonymously({
      options: {
        data: { full_name: DEMO_USER_NAME },
        ...(captchaToken && { captchaToken }),
      },
    });

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error("Anonymous sign-in returned no user.");
  }

  const { error: seedError } = await supabase.rpc("seed_demo_data");

  if (seedError) throw new Error(seedError.message);
};
