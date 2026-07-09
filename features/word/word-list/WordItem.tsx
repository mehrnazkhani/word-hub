import { memo, ReactNode } from "react";
import { WordAccordion } from "../word-accordion/WordAccordion";
import type { Word } from "@/types/db-aliases";

type WordItemProps = {
  word: Word;
  dateType?: "deleted" | "created";
  renderContextMenu: (children: ReactNode) => ReactNode;
};

export const WordItem = memo(
  ({ word, dateType = "created", renderContextMenu }: WordItemProps) => {
    return renderContextMenu(
      <div className="[&>div]:border-b last:[&>div]:border-b-0">
        <WordAccordion.Item value={`item-${word.id}`} word={word}>
          <WordAccordion.Trigger>
            <WordAccordion.Trigger.Left>
              <WordAccordion.Trigger.WordTitle />
            </WordAccordion.Trigger.Left>

            <WordAccordion.Trigger.Right>
              <WordAccordion.Trigger.Right.IconContainer>
                <WordAccordion.Trigger.Right.ChevronDown />
              </WordAccordion.Trigger.Right.IconContainer>
              <WordAccordion.Trigger.Right.Progress />
            </WordAccordion.Trigger.Right>
          </WordAccordion.Trigger>

          <WordAccordion.Content />

          <WordAccordion.Footer>
            <WordAccordion.Footer.Language />
            <WordAccordion.Footer.Date type={dateType} />
          </WordAccordion.Footer>
        </WordAccordion.Item>
      </div>,
    );
  },
);
