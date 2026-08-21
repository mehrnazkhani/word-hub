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
