import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { UserProvider } from "@/components/providers/user-provider";
import { ROUTES } from "@/constants/routes";

const ProtectedLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Guests (the Try Demo flow) are signed in on an anonymous session, which
  // getUser() returns as a regular user with is_anonymous set. They are
  // authenticated, so they pass this guard exactly like a registered user and
  // only the account-only UI is hidden for them (see isDemoUser). Reaching the
  // redirect means there is no session at all.
  if (!user) {
    redirect(ROUTES.SIGN_IN);
  }

  return <UserProvider initialUser={user}>{children}</UserProvider>;
};

export default ProtectedLayout;
