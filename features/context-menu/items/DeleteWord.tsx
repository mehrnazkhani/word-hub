"use client";

import { Trash2 } from "lucide-react";
import { ContextMenuItem } from "@/components/ui/context-menu";
import { useWordContextMenu } from "../WordContextMenuContext";

export const DeleteWord = () => {
  const { word } = useWordContextMenu();

  return (
    <ContextMenuItem
      variant="destructive"
      onSelect={() => handleDelete(word.id)}
      className="text-xs"
    >
      <Trash2 className="size-3" />
      Delete
    </ContextMenuItem>
  );
};

const handleDelete = (wordId: number) => {
  console.log("Delete word:", wordId);
};
