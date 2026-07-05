import { createContext, useContext, ReactNode } from "react";

import { useLanguages } from "@/queries/languages/useLanguages";
import { findObjectById } from "@/lib/utils/findObjectById";
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
  const { data: languages } = useLanguages();
  const sourceLanguage = languages
    ? findObjectById(languages, word.source_language_id)
    : undefined;

  const targetLanguage = languages
    ? findObjectById(languages, word.target_language_id)
    : undefined;

  return (
    <WordAccordionContext.Provider
      value={{ word: { ...word, sourceLanguage, targetLanguage } }}
    >
      {children}
    </WordAccordionContext.Provider>
  );
};
