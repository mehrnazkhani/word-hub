"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/components/providers/user-provider";
import { queryKeys } from "../queries";
import type { UserSettings } from "@/types/db-aliases";

export function useUserSettingsMutation<TData>(
  mutationFn: (data: TData) => Promise<UserSettings>,
) {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn,
    onSuccess: (updatedSettings) => {
      queryClient.setQueryData(
        queryKeys.settings.user(user!.id),
        updatedSettings,
      );
    },
  });
}
