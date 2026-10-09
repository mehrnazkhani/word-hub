import { FormDrawerDialog } from "@/components/FormDrawerDialog";
import EditWordForm from "@/features/word/form/EditWordForm";
import type { Word } from "@/types/db-aliases";

type EditWordDialogProps = {
  word: Word;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const EditWordDialog = ({
  word,
  open,
  onOpenChange,
}: EditWordDialogProps) => {
  return (
    <FormDrawerDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Word"
      description="Update the word and any of its details."
      dialogClassName="sm:max-w-lg"
    >
      <EditWordForm word={word} onSuccess={() => onOpenChange(false)} />
    </FormDrawerDialog>
  );
};
