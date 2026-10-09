"use client";

import { useCallback, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

import { SettingRow } from "../SettingRow";
import { DeleteAllDataDialog } from "./DeleteAllDataDialog";
import { deleteAllDataAction } from "./deleteAllData.action";
import { ROUTES } from "@/constants/routes";

export const DeleteAllData = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
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
        const result = await deleteAllDataAction();

        if (result && "error" in result && result.error) {
          throw new Error(result.error);
        }

        await queryClient.invalidateQueries();
        setOpen(false);
        router.replace(ROUTES.APP);
        toast.success("All data deleted successfully.");
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "An error occurred while deleting your data.",
        );
      }
    });
  }, [queryClient, router]);

  return (
    <SettingRow
      icon={{
        icon: Trash,
        variant: "destructive",
      }}
      title="Delete All Data"
      description="Permanently remove all words and non-system categories."
    >
      <Button
        variant="destructive"
        className="cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Delete All Data
      </Button>

      <DeleteAllDataDialog
        open={open}
        isPending={isPending}
        onOpenChange={handleOpenChange}
        onConfirm={handleDelete}
      />
    </SettingRow>
  );
};
