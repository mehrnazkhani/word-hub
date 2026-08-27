import { WordAccordion } from "../../word-accordion/WordAccordion";
import { DeletedWordContextMenu } from "./DeletedWordContextMenu";
import { WordItem } from "../WordItem";
import type { Word } from "@/types/db-aliases";

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
