"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { Folder } from "lucide-react";
import { FormInput } from "@/components/inputs/FormInput";
import { ArrowButton } from "@/components/ArrowButton";

import { applyServerErrors } from "@/lib/utils/applyServerErrors";
import { useCreateCategoryMutation } from "@/queries/categories/create/useCreateCategoryMutation";
import { useUserCategories } from "@/queries/categories/useCategories";
import { hasDuplicateCategoryName } from "./utils/hasDuplicateCategoryName";
import { APP_LIMITS } from "@/lib/app-limits";

import { categoryFormSchema, type CategoryFormValues } from "./category.schema";

const CreateCategoryForm = () => {
  const methods = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const { handleSubmit, reset, setError } = methods;

  const { mutateAsync: createCategory, isPending } =
    useCreateCategoryMutation();
  const { data: categories } = useUserCategories();

  const isLimitReached =
    (categories?.length ?? 0) >= APP_LIMITS.category_limit_per_user;

  const onSubmit = async (data: CategoryFormValues) => {
    if (isLimitReached) {
      toast.error(
        `You've reached the maximum limit of ${APP_LIMITS.category_limit_per_user} categories.`,
      );
      return;
    }

    if (hasDuplicateCategoryName(data.name, categories ?? [])) {
      setError("name", {
        message: "A category with this name already exists.",
      });
      return;
    }

    try {
      await createCategory(data, {
        onSuccess: (result) => {
          if (result.status === "validation_error" && result.fieldErrors) {
            applyServerErrors(setError, result.fieldErrors);
            return;
          }
          reset();
        },
      });
    } catch {}
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
          {isPending ? "Creating..." : "Create"}
        </ArrowButton>
      </form>
    </FormProvider>
  );
};

export default CreateCategoryForm;
