"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAuthenticatedUser } from "@/lib/supabase/getAuthenticatedUser";

export const deleteAccountAction = async () => {
  const user = await getAuthenticatedUser();
  const supabaseAdmin = createAdminClient();

  const { error: deleteAccountError } =
    await supabaseAdmin.auth.admin.deleteUser(user.id);

  if (deleteAccountError) {
    console.error("Delete user error:", deleteAccountError);
    return;
  }
  const supabase = await createClient();
  await supabase.auth.signOut();
};
