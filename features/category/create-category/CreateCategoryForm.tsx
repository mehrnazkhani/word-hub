"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { AppIcons } from "@/components/icons";
import { FormInput } from "@/components/inputs/FormInput";
import { LoadingButton } from "@/components/LoadingButton";

import { useCreateCategory } from "./useCreateCategory";
import { applyServerErrors } from "@/features/authentication/lib/applyServerErrors";

import {
  categoryFormSchema,
  categoryFormDefaultValues,
  type CategoryFormValues,
} from "./categoryForm.schema";

const CreateCategoryForm = () => {
  const method = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: categoryFormDefaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting },
  } = method;

  const { createCategory } = useCreateCategory();

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      const result = await createCategory(data);

      if (
        result &&
        "status" in result &&
        result.status === "validation_error"
      ) {
        applyServerErrors(setError, result.fieldErrors);
        return;
      }

      toast.success("Category created successfully.");
      reset();
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.message || "Failed to create category. Please try again.",
      );
    }
  };

  return (
    <FormProvider {...method}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormInput
          name="name"
          label="Category name"
          placeholder="Category Name"
        />

        <LoadingButton
          variant="ghost"
          isLoading={isSubmitting}
          className="self-end"
        >
          {isSubmitting ? "Creating..." : "Create"}
          <AppIcons.ChevronRightIcon />
        </LoadingButton>
      </form>
    </FormProvider>
  );
};

export default CreateCategoryForm;
