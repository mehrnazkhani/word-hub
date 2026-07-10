import { WordContextMenu } from "@/features/context-menu/WordContextMenu";
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
        <WordContextMenu.Copy />
        <WordContextMenu.Edit />
        <WordContextMenu.ShowInCategory />
        <WordContextMenu.Move />
        <WordContextMenu.Separator />
        <WordContextMenu.Delete />
      </WordContextMenu.Content>
    </WordContextMenu>
  );
};
