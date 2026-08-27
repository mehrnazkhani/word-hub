"use client";

import { useState } from "react";
import { Trash } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
      <Tooltip>
        <TooltipTrigger asChild>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" className="cursor-pointer">
              <Trash />
            </Button>
          </AlertDialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete all permanently</p>
        </TooltipContent>
      </Tooltip>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 ring-1 ring-destructive/20">
            <Trash className="size-5 text-destructive" />
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
