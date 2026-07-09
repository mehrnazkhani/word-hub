import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

import { AccordionItem } from "@/components/ui/accordion";
import { WordAccordionProvider } from "./WordAccordionContext";

type WordAccordionItemProps = PropsWithChildren<{
  value: string;
  word: any;
  className?: string;
}>;

export const WordAccordionItem = ({
  value,
  word,
  className,
  children,
}: WordAccordionItemProps) => {
  return (
    <AccordionItem
      value={value}
      className={cn("flex w-full flex-col px-2.5 py-5", className)}
    >
      <WordAccordionProvider word={word}>{children}</WordAccordionProvider>
    </AccordionItem>
  );
};
