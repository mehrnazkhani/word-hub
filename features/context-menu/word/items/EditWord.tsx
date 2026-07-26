"use client";

import { Pencil } from "lucide-react";
import { ContextMenuItem } from "@/components/ui/context-menu";
import { useWordContextMenu } from "../WordContextMenuContext";

export const EditWord = () => {
  const { word } = useWordContextMenu();

  return (
    <ContextMenuItem onSelect={() => handleEdit(word.id)} className="text-sm">
      <Pencil className="size-3" /> Edit
    </ContextMenuItem>
  );
};

const handleEdit = (wordId: number) => {
  console.log("Edit word:", wordId);
};
