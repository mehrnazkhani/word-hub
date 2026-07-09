import { WordAccordion } from "../../word-accordion/WordAccordion";
import { DeletedWordContextMenu } from "./DeletedWordContextMenu";
import type { Word } from "@/types/db-aliases";
import { WordItem } from "../WordItem";

type DeletedWordListProps = {
  words: Word[];
};

export const DeletedWordList = ({ words }: DeletedWordListProps) => {
  return (
    <WordAccordion>
      {words &&
        words.map((word) => (
          <WordItem
            key={word.id}
            word={word}
            dateType="deleted"
            renderContextMenu={(children) => (
              <DeletedWordContextMenu word={word}>
                {children}
              </DeletedWordContextMenu>
            )}
          />
        ))}
    </WordAccordion>
  );
};
