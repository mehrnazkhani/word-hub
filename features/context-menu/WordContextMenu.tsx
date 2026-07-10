"use client";

import { ReactNode } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import type { Word } from "@/types/db-aliases";

import { CopyWord } from "./items/CopyWord";
import { EditWord } from "./items/EditWord";
import { MoveWord } from "./items/MoveWord";
import { ShowInCategory } from "./items/ShowInCategory";
import { DeleteWord } from "./items/DeleteWord";
import { WordContextMenuContext } from "./WordContextMenuContext";
import { PermanentDeleteWord } from "./items/PermanentDeleteWord";
import { RestoreWord } from "./items/RestoreWord";

type WordContextMenuProps = {
  word: Word;
  children: ReactNode;
};

const WordContextMenuRoot = ({ word, children }: WordContextMenuProps) => {
  return (
    <WordContextMenuContext.Provider value={{ word }}>
      <ContextMenu>{children}</ContextMenu>
    </WordContextMenuContext.Provider>
  );
};

const Content = ({ children }: { children: ReactNode }) => (
  <ContextMenuContent className="p-2 text-xs">{children}</ContextMenuContent>
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
