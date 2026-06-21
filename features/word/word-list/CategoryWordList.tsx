"use client";

import { WordAccordion } from "@/features/word/word-accordion/WordAccordion";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import type { getWords } from "@/lib/data/getWords";

type CategoryWordListProps = {
  words: Awaited<ReturnType<typeof getWords>>;
};

export const CategoryWordList = ({ words }: CategoryWordListProps) => {
  return (
    <WordAccordion>
      {words &&
        words.map((word) => (
          <ContextMenu key={word.id}>
            <ContextMenuTrigger className="[&>div]:border-b last:[&>div]:border-b-0">
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
                  <WordAccordion.Footer.Date />
                </WordAccordion.Footer>
              </WordAccordion.Item>
            </ContextMenuTrigger>
          </ContextMenu>
        ))}
    </WordAccordion>
  );
};
