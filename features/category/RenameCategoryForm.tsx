"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/components/providers/user-provider";

import { Folder } from "lucide-react";
import { FormInput } from "@/components/inputs/FormInput";
import { ArrowButton } from "@/components/ArrowButton";

import { useRenameCategoryMutation } from "@/queries/categories/rename/useRenameCategory.mutation";
import { applyServerErrors } from "@/lib/utils/applyServerErrors";
import { hasDuplicateCategoryName } from "./utils/hasDuplicateCategoryName";
import { queryKeys } from "@/queries/queries";

import { categoryFormSchema, type CategoryFormValues } from "./category.schema";
import type { Category } from "@/types/db-aliases";

type RenameCategoryFormProps = {
  category: Category;
  onSuccess?: () => void;
};

export const RenameCategoryForm = ({
  category,
  onSuccess,
}: RenameCategoryFormProps) => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const methods = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: category.name,
    },
  });

  const { handleSubmit, setError } = methods;

  const { mutateAsync: renameCategory, isPending } =
    useRenameCategoryMutation();

  const onSubmit = async (data: CategoryFormValues) => {
    const categories =
      queryClient.getQueryData<Category[]>(queryKeys.category.user(user!.id)) ??
      [];

    if (hasDuplicateCategoryName(data.name, categories, category.id)) {
      setError("name", {
        message: "A category with this name already exists.",
      });
      return;
    }

    renameCategory(
      { formData: data, categoryId: category.id },
      {
        onSuccess: (result) => {
          if (result.status === "validation_error" && result.fieldErrors) {
            applyServerErrors(setError, result.fieldErrors);
            return;
          }
          onSuccess?.();
        },
      },
    );
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormInput
          icon={Folder}
          name="name"
          label="Category name"
          placeholder="Category Name"
        />

        <ArrowButton type="submit" isLoading={isPending} className="self-end">
          {isPending ? "Renaming..." : "Rename"}
        </ArrowButton>
      </form>
    </FormProvider>
  );
};
