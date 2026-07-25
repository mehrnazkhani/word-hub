"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Folder } from "lucide-react";
import { FormInput } from "@/components/inputs/FormInput";
import { ArrowButton } from "@/components/ArrowButton";

import { applyServerErrors } from "@/lib/utils/applyServerErrors";
import { useCreateCategoryMutation } from "@/queries/categories/create/useCreateCategoryMutation";

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

  const { handleSubmit, reset, setError } = method;

  const { mutateAsync: createCategory, isPending } =
    useCreateCategoryMutation();

  const onSubmit = async (data: CategoryFormValues) => {
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
    <FormProvider {...method}>
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
