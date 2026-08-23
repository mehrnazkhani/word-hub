"use client";

import { Trash2 } from "lucide-react";
import { ContextMenuItem } from "@/components/ui/context-menu";
import { useCategoryContextMenu } from "../CategoryContextMenuContext";

export const DeleteCategory = () => {
  const { setDialog } = useCategoryContextMenu();

  return (
    <ContextMenuItem variant="destructive" onSelect={() => setDialog("delete")}>
      <Trash2 className="size-3" />
      Delete
    </ContextMenuItem>
  );
};
