import { WordAccordion } from "../../word-accordion/WordAccordion";
import { DeletedWordContextMenu } from "./DeletedWordContextMenu";
import { WordItem } from "../WordItem";
import { PermanentDeleteAllButton } from "./PermanentDeleteAllButton";
import type { Word } from "@/types/db-aliases";

type DeletedWordListProps = {
  words: Word[];
};

export const DeletedWordList = ({ words }: DeletedWordListProps) => {
  return (
    <>
      {words.length > 0 && <PermanentDeleteAllButton />}

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
    </>
  );
};
