import { Word } from "@/types/db-aliases";
import { WordAccordion } from "../../word-accordion/WordAccordion";

type ImportWordListProps = {
  words: Word[];
};

export const ImportWordList = ({ words }: ImportWordListProps) => {
  return (
    <WordAccordion>
      {words &&
        words.map((word, index) => (
          <ImportWordItem key={index} word={word} index={index} />
        ))}
    </WordAccordion>
  );
};

const ImportWordItem = ({ word, index }: { word: Word; index: number }) => {
  return (
    <div className="rounded-md transition-colors duration-500 [&>div]:border-b last:[&>div]:border-b-0">
      <WordAccordion.Item value={`item-${index}`} word={word}>
        <WordAccordion.Trigger>
          <WordAccordion.Trigger.Left>
            <WordAccordion.Trigger.WordTitle />
          </WordAccordion.Trigger.Left>

          <WordAccordion.Trigger.Right>
            <WordAccordion.Trigger.Right.IconContainer>
              <WordAccordion.Trigger.Right.ChevronDown />
            </WordAccordion.Trigger.Right.IconContainer>
          </WordAccordion.Trigger.Right>
        </WordAccordion.Trigger>

        <WordAccordion.Content />

        <WordAccordion.Footer>
          <WordAccordion.Footer.Language />
        </WordAccordion.Footer>
      </WordAccordion.Item>
    </div>
  );
};
