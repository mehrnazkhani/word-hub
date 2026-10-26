import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";

import { ROUTES } from "@/constants/routes";
import { createClient } from "@/lib/supabase/server";
import { queryKeys } from "@/queries/queries";
import { prefetchDailyWordSuggestion } from "@/queries/daily_suggestions/dailyWordSuggestionsQuery";
import { prefetchUserSettings } from "@/queries/user-settings/prefetchUserSettings";
import type { UserSettings } from "@/types/db-aliases";

import { DashboardClient } from "./DashboardClient";

export default async function DashboardPage() {
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

  if (settings?.daily_word_enabled) {
    await prefetchDailyWordSuggestion({
      queryClient,
      supabase,
      settings,
      userId: user.id,
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardClient />
    </HydrationBoundary>
  );
}
