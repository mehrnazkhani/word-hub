import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { QueryClient } from "@tanstack/react-query";
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

  if (!user) {
    redirect(ROUTES.SIGN_IN);
  }

  const queryClient = new QueryClient();

  return <UserProvider initialUser={user}>{children}</UserProvider>;
};

export default ProtectedLayout;
