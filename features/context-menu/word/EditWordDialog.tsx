import { FormDialog } from "@/components/FormDialog";
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
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Word"
      description="Update the word and any of its details."
    >
      <EditWordForm word={word} onSuccess={() => onOpenChange(false)} />
    </FormDialog>
  );
};
