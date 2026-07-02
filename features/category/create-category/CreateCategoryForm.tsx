"use client";

import { FormInput } from "@/components/inputs/FormInput";
import { LoadingButton } from "@/components/LoadingButton";
import { useForm, FormProvider } from "react-hook-form";

import {
  categoryFormSchema,
  categoryFormDefaultValues,
  type CategoryFormValues,
} from "./categoryForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppIcons } from "@/components/icons";
import { createCategoryAction } from "./createCategory.action";
import { toast } from "sonner";

const CreateCategoryForm = () => {
  const method = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: categoryFormDefaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = method;

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      const result = await createCategoryAction(data);

      if (result) {
        toast.success("Category created successfully.");
        reset();
      }
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.message || "Failed to crete category. Please try again.",
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
