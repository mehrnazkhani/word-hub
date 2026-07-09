import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { AccordionTrigger } from "@/components/ui/accordion";

import { TriggerRightItems } from "./right-items/TriggerRightItems";
import { TriggerLeftItems } from "./left-items/TriggerLeftItems";
import { TriggerWordTitle } from "./left-items/TriggerWordTitle";

type WordAccordionTriggerRootProps = PropsWithChildren<{
  className?: string;
}>;

type WordAccordionTriggerComponent = React.FC<WordAccordionTriggerRootProps> & {
  Right: typeof TriggerRightItems;
  Left: typeof TriggerLeftItems;
  WordTitle: typeof TriggerWordTitle;
};

const WordAccordionTriggerRoot = ({
  children,
  className,
}: WordAccordionTriggerRootProps) => {
  return (
    <AccordionTrigger
      className={cn("group grid grid-cols-3 pb-1.5", className)}
    >
      {children}
    </AccordionTrigger>
  );
};

export const WordAccordionTrigger = Object.assign(WordAccordionTriggerRoot, {
  Right: TriggerRightItems,
  Left: TriggerLeftItems,
  WordTitle: TriggerWordTitle,
}) as WordAccordionTriggerComponent;
