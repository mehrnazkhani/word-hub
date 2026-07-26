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

    onMutate: async ({ formData, categoryId }) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.category.user(user!.id),
      });

      const previousCategories = queryClient.getQueryData<Category[]>(
        queryKeys.category.user(user!.id),
      );

      queryClient.setQueryData(
        queryKeys.category.user(user!.id),
        (old: Category[] | undefined) =>
          old?.map((c) =>
            c.id === categoryId ? { ...c, name: formData.name } : c,
          ) ?? [],
      );

      return { previousCategories };
    },

    onSuccess: (result, { formData, categoryId }, context) => {
      if (result.status === "not_found") {
        if (context?.previousCategories) {
          queryClient.setQueryData(
            queryKeys.category.user(user!.id),
            context.previousCategories,
          );
        }
        toast.error(result.message, { id: "rename-category" });
        return;
      }

      if (result.data) {
        queryClient.setQueryData(
          queryKeys.category.user(user!.id),
          (old: Category[] | undefined) =>
            old?.map((c) => (c.id === categoryId ? result.data : c)) ?? [],
        );
      }

      toast.success(`Category renamed to "${formData.name}" successfully`, {
        id: "rename-category",
      });
    },

    onError: (_error, _variables, context) => {
      if (context?.previousCategories) {
        queryClient.setQueryData(
          queryKeys.category.user(user!.id),
          context.previousCategories,
        );
      }

      toast.error("Failed to rename category. Please try again.", {
        id: "rename-category",
      });
    },
  });
};
