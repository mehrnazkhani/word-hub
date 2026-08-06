"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAuthenticatedUser } from "@/lib/supabase/getAuthenticatedUser";

export const deleteAccountAction = async () => {
  const supabase = await createClient();
  const user = await getAuthenticatedUser(supabase);
  const supabaseAdmin = createAdminClient();

  const { error: deleteAccountError } =
    await supabaseAdmin.auth.admin.deleteUser(user.id);

  if (deleteAccountError) {
    console.error("Delete user error:", deleteAccountError);
    return;
  }

  await supabase.auth.signOut();
};
