"use client";

import { cn } from "@/lib/utils";
import { memo, ReactNode, useEffect, useRef, useState } from "react";
import { WordAccordion } from "../word-accordion/WordAccordion";
import type { Word } from "@/types/db-aliases";

type WordItemProps = {
  word: Word;
  dateType?: "deleted" | "created";
  renderContextMenu: (children: ReactNode) => ReactNode;
  id?: string;
};

export const WordItem = memo(
  ({ word, dateType = "created", renderContextMenu, id }: WordItemProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [highlighted, setHighlighted] = useState(false);

    useEffect(() => {
      if (!id) return;
      if (window.location.hash !== `#${id}`) return;

      ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });

      const highlightTimer = setTimeout(() => setHighlighted(true), 500);
      const removeTimer = setTimeout(() => setHighlighted(false), 2500);

      return () => {
        clearTimeout(highlightTimer);
        clearTimeout(removeTimer);
      };
    }, [id]);

    return renderContextMenu(
      <div
        ref={ref}
        id={id}
        className={cn(
          "rounded-md transition-colors duration-500 [&>div]:border-b last:[&>div]:border-b-0",
          highlighted ? "bg-white/5" : "",
        )}
      >
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
