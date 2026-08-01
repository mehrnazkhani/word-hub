"use client";

import { ReactNode, useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import type { Word } from "@/types/db-aliases";

import { WordContextMenuContext } from "./WordContextMenuContext";
import { CopyWord } from "./items/CopyWord";
import { EditWord } from "./items/EditWord";
import { MoveWord } from "./items/MoveWord";
import { ShowInCategory } from "./items/ShowInCategory";
import { DeleteWord } from "./items/DeleteWord";
import { PermanentDeleteWord } from "./items/PermanentDeleteWord";
import { RestoreWord } from "./items/RestoreWord";
import { EditWordDialog } from "./EditWordDialog";

type WordContextMenuProps = {
  word: Word;
  children: ReactNode;
};

const WordContextMenuRoot = ({ word, children }: WordContextMenuProps) => {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <WordContextMenuContext.Provider value={{ word, setEditOpen }}>
      <ContextMenu>{children}</ContextMenu>

      <EditWordDialog word={word} open={editOpen} onOpenChange={setEditOpen} />
    </WordContextMenuContext.Provider>
  );
};

const Content = ({ children }: { children: ReactNode }) => (
  <ContextMenuContent className="p-2">{children}</ContextMenuContent>
);

export const WordContextMenu = Object.assign(WordContextMenuRoot, {
  Trigger: ContextMenuTrigger,
  Content,
  Copy: CopyWord,
  Edit: EditWord,
  Move: MoveWord,
  ShowInCategory,
  Delete: DeleteWord,
  Separator: ContextMenuSeparator,
  PermanentDelete: PermanentDeleteWord,
  Restore: RestoreWord,
});
