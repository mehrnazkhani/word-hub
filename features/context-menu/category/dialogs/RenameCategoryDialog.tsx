import { FormDialog } from "@/components/FormDialog";
import { RenameCategoryForm } from "@/features/category/form/RenameCategoryForm";
import type { Category } from "@/types/db-aliases";

type RenameCategoryDialogProps = {
  category: Category;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const RenameCategoryDialog = ({
  category,
  open,
  onOpenChange,
}: RenameCategoryDialogProps) => {
  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Rename Category"
      description="Rename this category while keeping all of its words."
    >
      <RenameCategoryForm
        category={category}
        onSuccess={() => onOpenChange(false)}
      />
    </FormDialog>
  );
};
