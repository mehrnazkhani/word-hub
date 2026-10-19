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
import { prefetchDailyWordSuggestion } from "@/queries/daily_suggestions/dailyWordSuggestionsQuery";
import { ROUTES } from "@/constants/routes";
import { queryKeys } from "@/queries/queries";
import type { UserSettings } from "@/types/db-aliases";

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

  const queryClient = new QueryClient();

  await prefetchUserSettings(queryClient, supabase, user.id);

  const settings = queryClient.getQueryData<UserSettings>(
    queryKeys.settings.user(user.id),
  );

  await Promise.all([
    prefetchWordCount(queryClient, supabase, user.id),
    settings?.daily_word_enabled
      ? prefetchDailyWordSuggestion({
          queryClient,
          supabase,
          settings,
          userId: user.id,
        })
      : Promise.resolve(),
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
