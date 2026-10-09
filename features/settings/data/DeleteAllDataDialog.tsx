"use client";

import { useState } from "react";

import { AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/LoadingButton";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type DeleteAllDataDialogProps = {
  open: boolean;
  isPending: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export const DeleteAllDataDialog = ({
  open,
  isPending,
  onOpenChange,
  onConfirm,
}: DeleteAllDataDialogProps) => {
  const [confirmText, setConfirmText] = useState("");
  const isConfirmed = confirmText.toUpperCase() === "DELETE";

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) setConfirmText("");
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 ring-1 ring-destructive/20">
            <AlertTriangle className="size-5 text-destructive" />
          </AlertDialogMedia>
          <div className="space-y-2">
            <AlertDialogTitle className="text-destructive">
              Delete All Data Permanently
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action is irreversible. All your words and non-system
              categories will be permanently deleted.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>

        <div className="mb-5 space-y-3">
          <label className="block text-xs text-accent-foreground/50">
            To confirm, type{" "}
            <span className="font-bold text-accent-foreground/70">DELETE</span>{" "}
            below
          </label>
          <Input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="DELETE"
            disabled={isPending}
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <LoadingButton
            variant="destructive"
            disabled={!isConfirmed || isPending}
            isLoading={isPending}
            onClick={onConfirm}
          >
            {isPending ? "Deleting Data..." : "Delete All Data"}
          </LoadingButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
