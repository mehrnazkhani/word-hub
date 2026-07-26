"use client";

import { FolderPen } from "lucide-react";
import { ContextMenuItem } from "@/components/ui/context-menu";
import { useCategoryContextMenu } from "../CategoryContextMenuContext";

export const RenameCategory = () => {
  const { setDialog } = useCategoryContextMenu();

  return (
    <ContextMenuItem onSelect={() => setDialog("rename")} className="text-xs">
      <FolderPen className="size-3" />
      Rename
    </ContextMenuItem>
  );
};
