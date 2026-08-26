"use client";

import { useState } from "react";
import { Trash, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { usePermanentDeleteAllWordsMutation } from "@/queries/words/delete/usePermanentDeleteAllWords.mutation";

export const PermanentDeleteAllButton = () => {
  const [open, setOpen] = useState(false);
  const { mutate: permanentDeleteAll, isPending } =
    usePermanentDeleteAllWordsMutation();

  const handleDelete = async () => {
    permanentDeleteAll(undefined, {
      onSettled: () => setOpen(false),
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="w-full cursor-pointer">
          <Trash />
          Permanent Delete All
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 ring-1 ring-destructive/20">
            <Trash2 className="size-5 text-destructive" />
          </AlertDialogMedia>

          <div className="space-y-2">
            <AlertDialogTitle className="text-destructive">
              Permanently delete all deleted words?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. All words in the trash will be
              permanently deleted.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
          >
            Delete All
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
