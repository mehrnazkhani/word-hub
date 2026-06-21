import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { Accordion } from "@/components/ui/accordion";

import { WordAccordionContent } from "./accordion-content/WordAccordionContent";
import { WordAccordionTrigger } from "./accordion-trigger/WordAccordionTrigger";
import { WordAccordionItem } from "./WordAccordionItem";
import { WordAccordionFooter } from "./accordion-footer/WordAccordionFooter";

type WordAccordionRootProps = PropsWithChildren<{
  className?: string;
}>;

type WordAccordionComponent = React.FC<WordAccordionRootProps> & {
  Item: typeof WordAccordionItem;
  Trigger: typeof WordAccordionTrigger;
  Content: typeof WordAccordionContent;
  Footer: typeof WordAccordionFooter;
};

const WordAccordionRoot = ({ children, className }: WordAccordionRootProps) => {
  return (
    <Accordion type="multiple" className={cn("w-full", className)}>
      {children}
    </Accordion>
  );
};

export const WordAccordion = Object.assign(WordAccordionRoot, {
  Item: WordAccordionItem,
  Trigger: WordAccordionTrigger,
  Content: WordAccordionContent,
  Footer: WordAccordionFooter,
}) as WordAccordionComponent;
