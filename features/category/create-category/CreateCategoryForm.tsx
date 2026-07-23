"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { FormInput } from "@/components/inputs/FormInput";

import { useCreateCategory } from "./useCreateCategory";
import { applyServerErrors } from "@/features/authentication/lib/applyServerErrors";

import {
  categoryFormSchema,
  categoryFormDefaultValues,
  type CategoryFormValues,
} from "./categoryForm.schema";
import { ArrowButton } from "@/components/ArrowButton";

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

      if (result.status === "validation_error") {
        applyServerErrors(setError, result.fieldErrors);
        return;
      }

      if (result.status === "limit_error") {
        toast.error(result.message);
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

        <ArrowButton
          type="submit"
          isLoading={isSubmitting}
          className="self-end"
        >
          {isSubmitting ? "Creating..." : "Create"}
        </ArrowButton>
      </form>
    </FormProvider>
  );
};

export default CreateCategoryForm;
