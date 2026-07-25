"use client";

import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/components/providers/user-provider";
import { createCategoryAction } from "./createCategory.action";
import { queryKeys } from "@/queries/queries";

import type { CategoryFormValues } from "@/features/category/create-category/categoryForm.schema";
import type { Category } from "@/types/db-aliases";

const MAX_CATEGORIES_PER_USER = 20;

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: (formData: CategoryFormValues) =>
      createCategoryAction(formData),

    onMutate: (formData) => {
      const categories =
        queryClient.getQueryData<Category[]>(
          queryKeys.category.user(user!.id),
        ) ?? [];

      if (categories.length >= MAX_CATEGORIES_PER_USER) {
        throw new Error("limit_exceeded");
      }

      const normalizedName = formData.name.trim().toLowerCase();
      const isDuplicate = categories.some(
        (c) => c.name.trim().toLowerCase() === normalizedName,
      );

      if (isDuplicate) {
        throw new Error("duplicate_name");
      }
    },

    onSuccess: (result, formData) => {
      if (result.status === "validation_error") {
        toast.error("A category with this name already exists.", {
          id: "create-category",
        });
        return;
      }

      if (result.status === "limit_error") {
        toast.error(result.message, { id: "create-category" });
        return;
      }

      if (result.data) {
        queryClient.setQueryData(
          queryKeys.category.user(user!.id),
          (old: Category[]) => [result.data, ...(old ?? [])],
        );
      } else {
        queryClient.invalidateQueries({
          queryKey: queryKeys.category.user(user!.id),
        });
      }

      toast.success(`Category "${formData.name}" created successfully`, {
        id: "create-category",
      });
    },

    onError: (error) => {
      if (error.message === "limit_exceeded") {
        toast.error(
          `You can only create up to ${MAX_CATEGORIES_PER_USER} categories.`,
          { id: "create-category" },
        );
        return;
      }

      if (error.message === "duplicate_name") {
        toast.error("A category with this name already exists.", {
          id: "create-category",
        });
        return;
      }

      toast.error("Failed to create category. Please try again.", {
        id: "create-category",
      });
    },
  });
};
