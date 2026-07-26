import { WordContextMenu } from "@/features/context-menu/word/WordContextMenu";
import type { Word } from "@/types/db-aliases";

type RecentWordContextMenuProps = {
  word: Word;
  children: React.ReactNode;
};

export const RecentWordContextMenu = ({
  word,
  children,
}: RecentWordContextMenuProps) => {
  return (
    <WordContextMenu word={word}>
      <WordContextMenu.Trigger>{children}</WordContextMenu.Trigger>
      <WordContextMenu.Content>
        <WordContextMenu.ShowInCategory />
      </WordContextMenu.Content>
    </WordContextMenu>
  );
};
