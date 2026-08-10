import { WordAccordion } from "../../word-accordion/WordAccordion";
import { mapWordToImportShape } from "@/lib/utils/mapWordToImportShape";
import type { ExportShape } from "@/lib/utils/mapWordToExportShape";

type ImportWordListProps = {
  words: ExportShape[];
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

const ImportWordItem = ({
  word,
  index,
}: {
  word: ExportShape;
  index: number;
}) => {
  const dbWord = mapWordToImportShape({ word, categoryId: 0 });

  return (
    <div className="rounded-md transition-colors duration-500 [&>div]:border-b last:[&>div]:border-b-0">
      <WordAccordion.Item value={`item-${index}`} word={dbWord}>
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
