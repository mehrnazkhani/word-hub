import { useFormContext } from "react-hook-form";
import { Folder } from "lucide-react";
import { FormInput } from "@/components/inputs/FormInput";
import { ArrowButton } from "@/components/ArrowButton";
import type { CategoryFormValues } from "../category.schema";

type CategoryFormProps = {
  onSubmit: (data: CategoryFormValues) => Promise<void>;
  submitLabel: string;

  isPending: boolean;
  pendingLabel: string;
};

export const CategoryForm = ({
  onSubmit,
  submitLabel,
  isPending,
  pendingLabel,
}: CategoryFormProps) => {
  const { handleSubmit } = useFormContext<CategoryFormValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FormInput
        icon={Folder}
        name="name"
        label="Category name"
        placeholder="Category Name"
      />

      <ArrowButton type="submit" isLoading={isPending} className="self-end">
        {isPending ? pendingLabel : submitLabel}
      </ArrowButton>
    </form>
  );
};
