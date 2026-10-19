"use client";

import { useCallback, useState, useTransition } from "react";

import { toast } from "sonner";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

import { SettingRow } from "../../SettingRow";
import { useUser } from "@/components/providers/user-provider";
import { isDemoUser } from "@/lib/utils/isDemoUser";
import { DEMO_UNAVAILABLE_LABEL } from "@/constants/demo";
import { DeleteAccountDialog } from "./DeleteAccountDialog";
import { deleteAccountAction } from "./deleteAccount.action";

export const DeleteAccount = () => {
  const { user } = useUser();
  const isDemo = isDemoUser(user);
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
      description={
        isDemo
          ? DEMO_UNAVAILABLE_LABEL
          : "Permanently remove your account and all associated data."
      }
    >
      <Button
        variant="destructive"
        className="cursor-pointer"
        disabled={isDemo}
        onClick={() => setOpen(true)}
      >
        Delete Account
      </Button>

      {!isDemo && (
        <DeleteAccountDialog
          open={open}
          isPending={isPending}
          onOpenChange={handleOpenChange}
          onConfirm={handleDelete}
        />
      )}
    </SettingRow>
  );
};
