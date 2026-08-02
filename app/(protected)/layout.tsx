import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { UserProvider } from "@/components/providers/user-provider";
import { prefetchUserSettings } from "@/queries/user-settings/prefetchUserSettings";
import { prefetchWordCount } from "@/queries/words/count/wordCountQuery";
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

  await Promise.all([
    prefetchUserSettings(queryClient, supabase, user.id),
    prefetchWordCount(queryClient, supabase, user.id),
  ]);

  return (
    <UserProvider initialUser={user}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    </UserProvider>
  );
};

export default ProtectedLayout;
