"use client";

import { Pencil } from "lucide-react";
import { ContextMenuItem } from "@/components/ui/context-menu";
import { useWordContextMenu } from "../WordContextMenuContext";

export const EditWord = () => {
  const { setEditOpen } = useWordContextMenu();

  return (
    <ContextMenuItem onSelect={() => setEditOpen(true)}>
      <Pencil className="size-3" /> Edit
    </ContextMenuItem>
  );
};
