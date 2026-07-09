"use client";

import type { ReactNode } from "react";
import { RotateCcw, Trash2 } from "lucide-react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { Word } from "@/types/db-aliases";

type DeletedWordContextMenuProps = {
  word: Word;
  children: ReactNode;
};

export const DeletedWordContextMenu = ({
  word,
  children,
}: DeletedWordContextMenuProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="p-2">
        <ContextMenuItem
          onSelect={() => handleRestore(word.id)}
          className="text-xs"
        >
          <RotateCcw className="size-3" />
          Restore
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          variant="destructive"
          onSelect={() => handlePermanentDelete(word.id)}
          className="text-xs"
        >
          <Trash2 className="size-3" />
          Delete permanently
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

const handleRestore = (wordId: number) => {
  console.log("Restore word:", wordId);
};

const handlePermanentDelete = (wordId: number) => {
  console.log("Permanently delete word:", wordId);
};
