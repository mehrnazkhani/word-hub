import { useFormContext } from "react-hook-form";
import { Folder } from "lucide-react";
import { FormInput } from "@/components/inputs/FormInput";
import { LoadingButton } from "@/components/LoadingButton";
import { FormFooter } from "@/components/FormFooter";
import type { CategoryFormValues } from "../category.schema";

type CategoryFormProps = {
  formId: string;
  onSubmit: (data: CategoryFormValues) => Promise<void>;
  submitLabel: string;
  isPending: boolean;
  pendingLabel: string;
};

export const CategoryForm = ({
  formId,
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
    <>
      <form id={formId} onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          icon={Folder}
          name="name"
          label="Category name"
          placeholder="Category Name"
        />
      </form>

      <FormFooter>
        <LoadingButton
          className="w-full"
          type="submit"
          form={formId}
          size="lg"
          isLoading={isPending}
          disabled={!isDirty}
        >
          {isPending ? pendingLabel : submitLabel}
        </LoadingButton>
      </FormFooter>
    </>
  );
};
