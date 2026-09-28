"use client";

import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/components/providers/user-provider";
import { useSupabase } from "@/lib/supabase/useSupabase";
import { queryKeys } from "@/queries/queries";
import { getTelegramLinkStatus } from "./getTelegramLinkStatus";

export function useTelegramLinkStatus() {
  const { user, isPending } = useUser();
  const supabase = useSupabase();

  return useQuery({
    queryKey: queryKeys.telegram.status(user!.id),
    enabled: !!user && !isPending,
    queryFn: () =>
      getTelegramLinkStatus({
        client: supabase,
        userId: user!.id,
      }),
  });
}
