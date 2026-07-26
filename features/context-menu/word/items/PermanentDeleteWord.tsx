"use client";

import { Trash2 } from "lucide-react";
import { ContextMenuItem } from "@/components/ui/context-menu";
import { useWordContextMenu } from "../WordContextMenuContext";
import { usePermanentDeleteWordMutation } from "@/queries/words/delete/usePermanentDeleteWord.mutation";

export const PermanentDeleteWord = () => {
  const { word } = useWordContextMenu();
  const { mutate: permanentDeleteWord } = usePermanentDeleteWordMutation();

  const handlePermanentDelete = () => {
    permanentDeleteWord({ word });
  };

  return (
    <ContextMenuItem
      variant="destructive"
      onSelect={handlePermanentDelete}
      className="text-sm"
    >
      <Trash2 className="size-3" />
      Permanent Delete
    </ContextMenuItem>
  );
};
