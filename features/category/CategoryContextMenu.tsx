"use client";

import type { ReactNode } from "react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

type CategoryContextMenuProps = {
  children: ReactNode;
  onRename: () => void;
  onExport: () => void;
  onDelete: () => void;
};

export const CategoryContextMenu = ({
  children,
  onRename,
  onExport,
  onDelete,
}: CategoryContextMenuProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>

      <ContextMenuContent>
        <ContextMenuItem onSelect={onRename}>Rename</ContextMenuItem>

        <ContextMenuItem onSelect={onExport}>Export</ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem variant="destructive" onSelect={onDelete}>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
