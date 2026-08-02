"use client";

import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/components/providers/user-provider";
import { createCategoryAction } from "./createCategory.action";
import { queryKeys } from "@/queries/queries";

import type { CategoryFormValues } from "@/features/category/category.schema";
import type { Category } from "@/types/db-aliases";

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: (formData: CategoryFormValues) =>
      createCategoryAction(formData),

    onMutate: async (formData) => {
      const queryKey = queryKeys.category.user(user!.id);

      await queryClient.cancelQueries({ queryKey });

      const previousCategories = queryClient.getQueryData<Category[]>(queryKey);

      const optimisticCategory: Category = {
        id: -Date.now(),
        name: formData.name.trim(),
        user_id: user!.id,
        created_at: new Date().toISOString(),
        updated_at: null,
        deleted_at: null,
        is_system: null,
      };

      queryClient.setQueryData<Category[]>(queryKey, (old) => {
        const systemCategories = (old ?? []).filter((c) => c.is_system);
        const userCategories = (old ?? []).filter((c) => !c.is_system);
        return [...systemCategories, optimisticCategory, ...userCategories];
      });

      return { previousCategories, queryKey, optimisticCategory };
    },

    onSuccess: (result, formData, context) => {
      if (result.status === "validation_error") {
        toast.error("A category with this name already exists.", {
          id: "create-category",
        });
        queryClient.setQueryData(context.queryKey, context.previousCategories);
        return;
      }

      if (result.status === "limit_reached") {
        toast.error(result.message, { id: "create-category" });
        queryClient.setQueryData(context.queryKey, context.previousCategories);
        return;
      }

      if (result.data) {
        queryClient.setQueryData<Category[]>(
          context.queryKey,
          (old) =>
            old?.map((c) =>
              c.id === context.optimisticCategory.id ? result.data : c,
            ) ?? [],
        );
      } else {
        queryClient.invalidateQueries({ queryKey: context.queryKey });
      }

      toast.success(`Category "${formData.name}" created successfully`, {
        id: "create-category",
      });
    },

    onError: (_err, _formData, context) => {
      if (context?.previousCategories !== undefined) {
        queryClient.setQueryData(context.queryKey, context.previousCategories);
      }

      toast.error("Failed to create category. Please try again.", {
        id: "create-category",
      });
    },
  });
};
