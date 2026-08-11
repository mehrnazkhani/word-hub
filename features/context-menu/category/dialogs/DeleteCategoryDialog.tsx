"use client";

import { useParams } from "next/navigation";

import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteCategoryMutation } from "@/queries/categories/delete/useDeleteCategory.mutation";
import type { Category } from "@/types/db-aliases";

type DeleteCategoryDialogProps = {
  category: Category;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const DeleteCategoryDialog = ({
  category,
  open,
  onOpenChange,
}: DeleteCategoryDialogProps) => {
  const { mutateAsync: deleteCategory, isPending } =
    useDeleteCategoryMutation();
  const params = useParams();

  const handleDelete = async () => {
    const currentCategoryId = params.categoryId
      ? Number(params.categoryId)
      : undefined;

    await deleteCategory({ category, currentCategoryId });
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 ring-1 ring-destructive/20">
            <Trash2 className="size-5 text-destructive" />
          </AlertDialogMedia>
          <div className="space-y-2">
            <AlertDialogTitle className="text-destructive">
              Delete &quot;{category.name}&quot;?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This category will be permanently deleted. Its words will be moved
              to trash and recoverable for 30 days.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
