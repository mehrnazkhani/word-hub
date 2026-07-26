"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Folder } from "lucide-react";
import { FormInput } from "@/components/inputs/FormInput";
import { ArrowButton } from "@/components/ArrowButton";

import { applyServerErrors } from "@/lib/utils/applyServerErrors";
import { useCreateCategoryMutation } from "@/queries/categories/create/useCreateCategoryMutation";

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
