import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RenameCategoryForm } from "@/features/category/RenameCategoryForm";
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Category</DialogTitle>
        </DialogHeader>
        <RenameCategoryForm
          category={category}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
