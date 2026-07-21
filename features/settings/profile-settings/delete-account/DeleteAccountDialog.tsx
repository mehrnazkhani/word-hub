"use client";

import { useState } from "react";

import { AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { InputWrapper } from "@/components/inputs/InputWrapper";
import { IconBadge } from "@/components/ui/icon-badge";
import { LoadingButton } from "@/components/LoadingButton";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type DeleteAccountDialogProps = {
  open: boolean;
  isPending: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export const DeleteAccountDialog = ({
  open,
  isPending,
  onOpenChange,
  onConfirm,
}: DeleteAccountDialogProps) => {
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
          <AlertDialogTitle className="mb-3 flex gap-2 text-center text-destructive">
            <IconBadge icon={AlertTriangle} variant="destructive" />
            Delete Account Permanently
          </AlertDialogTitle>

          <AlertDialogDescription className="text-xs">
            This action is irreversible. All your data, posts, settings, and
            information will be permanently deleted.
            <br />
            <br />
            To confirm, type{" "}
            <span className="font-bold text-destructive">DELETE</span> below:
          </AlertDialogDescription>
        </AlertDialogHeader>

        <InputWrapper className="mb-5">
          <Input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="DELETE"
            disabled={isPending}
          />
        </InputWrapper>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <LoadingButton
            variant="destructive"
            disabled={!isConfirmed || isPending}
            isLoading={isPending}
            onClick={onConfirm}
          >
            {isPending ? "Deleting Account..." : "Delete My Account"}
          </LoadingButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
