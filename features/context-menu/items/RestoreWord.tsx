"use client";

import { RotateCcw } from "lucide-react";
import { ContextMenuItem } from "@/components/ui/context-menu";
import { useWordContextMenu } from "../WordContextMenuContext";
import { useRestoreWord } from "@/queries/words/useRestoreWord";

export const RestoreWord = () => {
  const { word } = useWordContextMenu();
  const { mutate: restoreWord } = useRestoreWord();

  const handleRestore = () => {
    restoreWord({ word });
  };

  return (
    <ContextMenuItem onSelect={handleRestore} className="text-sm">
      <RotateCcw className="size-3" />
      Restore
    </ContextMenuItem>
  );
};
