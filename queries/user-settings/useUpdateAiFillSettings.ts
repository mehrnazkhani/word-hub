"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/components/providers/user-provider";
import { updateAiFillSettingsAction } from "./updateAiFillSettings.action";
import { queryKeys } from "../queries";
import type { AiFillFields } from "@/types/db-aliases";

export const useUpdateAiFillSettings = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: (data: AiFillFields) => updateAiFillSettingsAction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.settings.user(user!.id),
      });
    },
  });
};
