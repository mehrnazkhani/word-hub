"use client";

import { RotateCcw } from "lucide-react";
import { ContextMenuItem } from "@/components/ui/context-menu";
import { useWordContextMenu } from "../WordContextMenuContext";

export const RestoreWord = () => {
  const { word } = useWordContextMenu();

  return (
    <ContextMenuItem
      onSelect={() => handleRestore(word.id)}
      className="text-sm"
    >
      <RotateCcw className="size-3" />
      Copy
    </ContextMenuItem>
  );
};

const handleRestore = (wordId: number) => {
  console.log("Restore word:", wordId);
};
