import type { AddWordFormValues } from "./addWord.schema";

export const addWordFormDefaultValues: AddWordFormValues = {
  word: "",
  translation: "",
  sourceLanguageId: "",
  targetLanguageId: "",
  partOfSpeech: null,
  categoryId: null,
  synonyms: "",
  antonyms: "",
  description: "",
};
