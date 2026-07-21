"use client";

import { useCallback, useState, useTransition } from "react";

import { toast } from "sonner";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

import { SettingRow } from "../../SettingRow";
import { DeleteAccountDialog } from "./DeleteAccountDialog";
import { deleteAccountAction } from "@/features/settings/profile-settings/delete-account/deleteAccount.action";

export const DeleteAccount = () => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      if (isPending) return;
      setOpen(isOpen);
    },
    [isPending],
  );

  const handleDelete = useCallback(() => {
    startTransition(async () => {
      try {
        await deleteAccountAction();
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "An error occurred while deleting your account.",
        );
      }
    });
  }, []);

  return (
    <SettingRow
      icon={{
        icon: Trash,
        variant: "destructive",
      }}
      title="Delete Account"
      description="Permanently remove your account and all associated data."
    >
      <Button
        variant="destructive"
        className="cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Trash />
        Delete Account
      </Button>

      <DeleteAccountDialog
        open={open}
        isPending={isPending}
        onOpenChange={handleOpenChange}
        onConfirm={handleDelete}
      />
    </SettingRow>
  );
};
