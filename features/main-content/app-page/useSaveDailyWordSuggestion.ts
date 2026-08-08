"use client";

import { useCreateWordMutation } from "@/queries/words/create/useCreateWord.mutation";
import { useMoveWordMutation } from "@/queries/words/move/useMoveWord.mutation";
import { useDailySuggestionCache } from "./useDailySuggestionCache";
import { joinRelatedWords } from "@/schemas/word/word.shared";

import type { Word } from "@/types/db-aliases";
import type { SavedSuggestion } from "./SaveWordButton";

type SaveDailyWordSuggestionProps = {
  word: Word;
  savedSuggestion: SavedSuggestion;
};

export const useSaveDailyWordSuggestion = ({
  word,
  savedSuggestion,
}: SaveDailyWordSuggestionProps) => {
  const { mutate: createWord } = useCreateWordMutation();
  const { mutate: moveWord } = useMoveWordMutation();
  const cache = useDailySuggestionCache();

  const isSaved = !!savedSuggestion;

  const create = (categoryId: number) => {
    const snapshot = cache.getSnapshot();
    cache.updateSavedSuggestion({ id: -1, category_id: categoryId });

    createWord(
      {
        word: word.word,
        translation: word.translation,
        categoryId: String(categoryId),
        sourceLanguageId: String(word.source_language_id),
        targetLanguageId: String(word.target_language_id),
        partOfSpeech: word.part_of_speech ?? undefined,
        synonyms: word.synonyms ? joinRelatedWords(word.synonyms) : undefined,
        antonyms: word.antonyms ? joinRelatedWords(word.antonyms) : undefined,
        example: word.example ?? undefined,
        description: word.description ?? undefined,
        source: "suggestion",
      },
      {
        onSuccess: (result) => {
          const id = result.status === "success" ? (result.data?.id ?? -1) : -1;
          result.status === "success"
            ? cache.updateSavedSuggestion({ id, category_id: categoryId })
            : cache.restore(snapshot);
        },
        onError: () => cache.restore(snapshot),
      },
    );
  };

  const moveToAnotherCategory = (categoryId: number) => {
    const savedWord = {
      ...word,
      id: savedSuggestion!.id,
      category_id: savedSuggestion!.category_id,
    };
    cache.updateSavedSuggestion({
      ...savedSuggestion!,
      category_id: categoryId,
    });

    moveWord(
      { word: savedWord, toCategoryId: categoryId },
      { onError: () => cache.updateSavedSuggestion(savedSuggestion) },
    );
  };

  const saveToCategory = (categoryId: number) => {
    if (isSaved && savedSuggestion.category_id === categoryId) return;
    isSaved ? moveToAnotherCategory(categoryId) : create(categoryId);
  };

  return { isSaved, saveToCategory };
};
