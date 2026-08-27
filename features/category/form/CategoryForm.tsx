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
  const {
    handleSubmit,
    formState: { isDirty },
  } = useFormContext<CategoryFormValues>();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full flex-col gap-4"
    >
      <FormInput
        icon={Folder}
        name="name"
        label="Category name"
        placeholder="Category Name"
      />

      <div className="flex-1" />

      <ArrowButton
        type="submit"
        isLoading={isPending}
        isDirty={isDirty}
        disabled={!isDirty}
        className="self-end"
      >
        {isPending ? pendingLabel : submitLabel}
      </ArrowButton>
    </form>
  );
};
