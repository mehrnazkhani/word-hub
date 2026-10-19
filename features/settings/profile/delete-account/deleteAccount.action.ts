"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAuthenticatedUser } from "@/lib/supabase/getAuthenticatedUser";
import { isDemoUser } from "@/lib/utils/isDemoUser";
import { DEMO_UNAVAILABLE_LABEL } from "@/constants/demo";

export const deleteAccountAction = async () => {
  const supabase = await createClient();
  const user = await getAuthenticatedUser(supabase);

  // Guests have no account behind their anonymous session, Supabase just drops
  // the user when the session goes away.
  if (isDemoUser(user)) {
    throw new Error(DEMO_UNAVAILABLE_LABEL);
  }

  const supabaseAdmin = createAdminClient();

  const { error: deleteAccountError } =
    await supabaseAdmin.auth.admin.deleteUser(user.id);

  if (deleteAccountError) {
    console.error("Delete user error:", deleteAccountError);
    return;
  }

  await supabase.auth.signOut();
};
