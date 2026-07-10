"use client";

import { Trash2 } from "lucide-react";
import { ContextMenuItem } from "@/components/ui/context-menu";
import { useWordContextMenu } from "../WordContextMenuContext";

export const PermanentDeleteWord = () => {
  const { word } = useWordContextMenu();

  return (
    <ContextMenuItem
      onSelect={() => handlePermanentDelete(word.id)}
      className="text-sm"
    >
      <Trash2 className="size-3" />
      Copy
    </ContextMenuItem>
  );
};

const handlePermanentDelete = (wordId: number) => {
  console.log("Permanently delete word:", wordId);
};
