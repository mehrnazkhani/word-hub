import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

import { FooterLanguages } from "./FooterLanguages";
import { FooterDate } from "./FooterDate";

type WordAccordionFooterProps = PropsWithChildren<{
  className?: string;
}>;

type WordAccordionFooterComponent = React.FC<WordAccordionFooterProps> & {
  Language: typeof FooterLanguages;
  Date: typeof FooterDate;
};

const WordAccordionFooterRoot = ({
  className,
  children,
}: WordAccordionFooterProps) => {
  return (
    <footer
      className={cn(
        "flex items-center justify-between pt-1.5 text-xs",
        className,
      )}
    >
      {children}
    </footer>
  );
};

export const WordAccordionFooter = Object.assign(WordAccordionFooterRoot, {
  Language: FooterLanguages,
  Date: FooterDate,
}) as WordAccordionFooterComponent;
