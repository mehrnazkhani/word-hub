"use client";

import { Trash2 } from "lucide-react";
import { ContextMenuItem } from "@/components/ui/context-menu";
import { useWordContextMenu } from "../WordContextMenuContext";
import { useDeleteWord } from "@/queries/words/useDeleteWord";

export const DeleteWord = () => {
  const { word } = useWordContextMenu();
  const { mutate: deleteWord } = useDeleteWord();

  const handleDelete = () => {
    deleteWord({ word });
  };

  return (
    <ContextMenuItem
      variant="destructive"
      onSelect={handleDelete}
      className="text-xs"
    >
      <Trash2 className="size-3" />
      Delete
    </ContextMenuItem>
  );
};
