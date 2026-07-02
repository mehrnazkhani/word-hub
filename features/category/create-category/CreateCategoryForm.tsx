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

const CreateCategoryForm = () => {
  const method = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: categoryFormDefaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = method;

  const onSubmit = async (data: CategoryFormValues) => {};

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
