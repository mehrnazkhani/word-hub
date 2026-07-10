import { createContext, useContext } from "react";
import type { Word } from "@/types/db-aliases";

type WordContextMenuContextValue = {
  word: Word;
};

export const WordContextMenuContext =
  createContext<WordContextMenuContextValue | null>(null);

export const useWordContextMenu = () => {
  const ctx = useContext(WordContextMenuContext);
  if (!ctx)
    throw new Error("useWordContextMenu must be used inside WordContextMenu");
  return ctx;
};
