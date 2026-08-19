"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/components/providers/user-provider";
import { deleteCategoryAction } from "./deleteCategory.action";
import { queryKeys } from "@/queries/queries";
import { ROUTES } from "@/constants/routes";
import type { Category } from "@/types/db-aliases";

type CategoryCache = {
  id: number;
  deleted_at: string | null;
  [key: string]: unknown;
};

type DeleteCategoryMutationProps = {
  category: Category;
  currentCategoryId?: number;
};

export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ category }: DeleteCategoryMutationProps) =>
      deleteCategoryAction({ categoryId: category.id }),

    onMutate: async ({ category, currentCategoryId }) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.category.user(user!.id),
      });

      const previousCategories = queryClient.getQueryData<CategoryCache[]>(
        queryKeys.category.user(user!.id),
      );

      if (
        currentCategoryId !== undefined &&
        currentCategoryId === category.id
      ) {
        router.replace(ROUTES.APP);
      }

      return { previousCategories, category };
    },

    onSuccess: (result, { category }) => {
      if (result.error) throw new Error(result.error);

      queryClient.setQueryData<CategoryCache[]>(
        queryKeys.category.user(user!.id),
        (old) => old?.filter((c) => c.id !== category.id) ?? [],
      );

      toast.success(`Category ${category.name} deleted successfully`, {
        id: "delete-category",
      });
    },

    onError: (_, { category }, context) => {
      if (context?.previousCategories) {
        queryClient.setQueryData(
          queryKeys.category.user(user!.id),
          context.previousCategories,
        );
      }

      toast.error("Failed to delete category. Please try again.", {
        id: "delete-category",
      });
    },
  });
};
