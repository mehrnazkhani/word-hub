"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/components/providers/user-provider";
import { updateDefaultWordFormSettingsAction } from "./updateDefaultWordFormSettings.action";
import { queryKeys } from "../queries";
import type { WordFormSettingsValues } from "@/schemas/word/word.schema";

export const useUpdateWordFormSettings = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: (data: WordFormSettingsValues) =>
      updateDefaultWordFormSettingsAction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.settings.user(user!.id),
      });
    },
  });
};
