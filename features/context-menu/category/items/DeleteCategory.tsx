"use client";

import { Trash2 } from "lucide-react";
import { ContextMenuItem } from "@/components/ui/context-menu";
import { useCategoryContextMenu } from "../CategoryContextMenuContext";

export const DeleteCategory = () => {
  const { category } = useCategoryContextMenu();

  const handleDelete = () => {};

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
