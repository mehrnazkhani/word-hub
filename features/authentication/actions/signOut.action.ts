"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export const signOutAction = async () => {
  const supabase = await createClient();

  // Check if a user's logged in
  const { data: claimsData } = await supabase.auth.getClaims();

  if (claimsData?.claims) {
    await supabase.auth.signOut();
  }

  revalidatePath(ROUTES.HOME, "layout");
  redirect(ROUTES.SIGN_IN);
};
