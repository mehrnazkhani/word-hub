"use client";

import { WordContextMenu } from "@/features/context-menu/WordContextMenu";
import type { Word } from "@/types/db-aliases";

type DeletedWordContextMenuProps = {
  word: Word;
  children: React.ReactNode;
};

export const DeletedWordContextMenu = ({
  word,
  children,
}: DeletedWordContextMenuProps) => {
  return (
    <WordContextMenu word={word}>
      <WordContextMenu.Trigger asChild>{children}</WordContextMenu.Trigger>
      <WordContextMenu.Content>
        <WordContextMenu.Restore />
        <WordContextMenu.PermanentDelete />
      </WordContextMenu.Content>
    </WordContextMenu>
  );
};
