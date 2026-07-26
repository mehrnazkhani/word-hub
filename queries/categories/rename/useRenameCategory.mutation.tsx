"use client";

import { useUser } from "@/components/providers/user-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  renameCategoryAction,
  type RenameCategoryActionProps,
} from "./renameCategory.action";
import { queryKeys } from "@/queries/queries";
import { Category } from "@/types/db-aliases";
import { toast } from "sonner";

export const useRenameCategoryMutation = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: (props: RenameCategoryActionProps) =>
      renameCategoryAction(props),

    onSuccess: (result, { formData, categoryId }) => {
      if (result.status === "not_found") {
        toast.error(result.message, { id: "rename-category" });
        return;
      }

      if (result.data) {
        queryClient.setQueryData(
          queryKeys.category.user(user!.id),
          (old: Category[]) =>
            old.map((c) => (c.id === categoryId ? result.data : c)),
        );
      } else {
        queryClient.invalidateQueries({
          queryKey: queryKeys.category.user(user!.id),
        });
      }

      toast.success(`Category renamed to "${formData.name}" successfully`, {
        id: "rename-category",
      });
    },

    onError: () => {
      toast.error("Failed to rename category. Please try again.", {
        id: "rename-category",
      });
    },
  });
};
