import { createContext, useContext, ReactNode } from "react";

const WordAccordionContext = createContext(undefined);

export const useWordAccordion = () => {
  const context = useContext(WordAccordionContext);
  if (!context)
    throw new Error("WordCard components must be used inside <WordCard />");

  return context;
};

interface WordCardProviderProps {
  word: any;
  children: ReactNode;
}

export const WordAccordionProvider = ({
  word,
  children,
}: WordCardProviderProps) => {
  return (
    <WordAccordionContext value={{ word }}>{children}</WordAccordionContext>
  );
};
