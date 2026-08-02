import { createContext, useContext, ReactNode } from "react";
import { getLanguageById } from "@/constants/languages";
import type { Word, Language } from "@/types/db-aliases";

type WordViewModel = Word & {
  sourceLanguage?: Language;
  targetLanguage?: Language;
};

type WordAccordionContextType = {
  word: WordViewModel;
};

const WordAccordionContext = createContext<
  WordAccordionContextType | undefined
>(undefined);

export const useWordAccordion = () => {
  const context = useContext(WordAccordionContext);

  if (!context) {
    throw new Error(
      "WordAccordion components must be used inside <WordAccordionProvider />",
    );
  }

  return context;
};

type WordAccordionProviderProps = {
  word: WordViewModel;
  children: ReactNode;
};

export const WordAccordionProvider = ({
  word,
  children,
}: WordAccordionProviderProps) => {
  const sourceLanguage = getLanguageById(word.source_language_id) ?? undefined;
  const targetLanguage = getLanguageById(word.target_language_id) ?? undefined;

  return (
    <WordAccordionContext.Provider
      value={{ word: { ...word, sourceLanguage, targetLanguage } }}
    >
      {children}
    </WordAccordionContext.Provider>
  );
};
