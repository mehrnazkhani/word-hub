import type { ReactNode } from "react";

import { Word } from "@/types/db-aliases";
import { WordContextMenu } from "@/features/context-menu/word/WordContextMenu";

type CategoryWordContextMenuProps = {
  word: Word;
  children: ReactNode;
};

export const CategoryWordContextMenu = ({
  word,
  children,
}: CategoryWordContextMenuProps) => {
  return (
    <WordContextMenu word={word}>
      <WordContextMenu.Trigger asChild>{children}</WordContextMenu.Trigger>
      <WordContextMenu.Content>
        <WordContextMenu.Copy />
        <WordContextMenu.Edit />
        <WordContextMenu.Move />
        <WordContextMenu.Separator />
        <WordContextMenu.Delete />
      </WordContextMenu.Content>
    </WordContextMenu>
  );
};
