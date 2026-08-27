"use client";

import { RotateCcw } from "lucide-react";
import { ContextMenuItem } from "@/components/ui/context-menu";
import { useWordContextMenu } from "../WordContextMenuContext";
import { useRestoreWordMutation } from "@/queries/words/restore/useRestoreWord.mutation";

export const RestoreWord = () => {
  const { word } = useWordContextMenu();
  const { mutate: restoreWord } = useRestoreWordMutation();

  const handleRestore = () => {
    restoreWord({ word });
  };

  return (
    <ContextMenuItem onSelect={handleRestore}>
      <RotateCcw className="size-3" />
      Restore
    </ContextMenuItem>
  );
};
