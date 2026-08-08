"use client";

import { cn } from "@/lib/utils";
import { Bookmark, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useCreateWordMutation } from "@/queries/words/create/useCreateWord.mutation";
import { useUserCategories } from "@/queries/categories/useCategories";
import { useUserSettings } from "@/queries/user-settings/useUserSettings";
import { queryKeys } from "@/queries/queries";

import type { Word } from "@/types/db-aliases";
import { joinRelatedWords } from "@/schemas/word/word.shared";

type SavedSuggestion = { id: number; category_id: number } | null;
type SaveWordButtonProps = {
  savedSuggestion: SavedSuggestion;
  word: Word;
};

export const SaveWordButton = ({
  savedSuggestion,
  word,
}: SaveWordButtonProps) => {
  const { data: categories } = useUserCategories();
  const { data: settings } = useUserSettings();
  const { mutate: createWord } = useCreateWordMutation();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const isSaved = !!savedSuggestion;
  const savedCategory = categories?.find(
    (c) => c.id === savedSuggestion?.category_id,
  );

  const dailySuggestionQueryKey = queryKeys.word.dailySuggestion(
    settings!.daily_word_source_lang_id,
    settings!.daily_word_level,
  );

  const handleSelectCategory = (categoryId: number) => {
    setOpen(false);

    const previous = queryClient.getQueryData(dailySuggestionQueryKey);

    queryClient.setQueryData(dailySuggestionQueryKey, (old: any) =>
      old
        ? { ...old, savedSuggestion: { id: -1, category_id: categoryId } }
        : old,
    );

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
          if (result.status === "success") {
            queryClient.setQueryData(dailySuggestionQueryKey, (old: any) =>
              old
                ? {
                    ...old,
                    savedSuggestion: {
                      id: result.data?.id ?? -1,
                      category_id: categoryId,
                    },
                  }
                : old,
            );
          } else {
            queryClient.setQueryData(dailySuggestionQueryKey, previous);
          }
        },
        onError: () => {
          queryClient.setQueryData(dailySuggestionQueryKey, previous);
        },
      },
    );
  };

  return (
    <DropdownMenu open={open} onOpenChange={(v) => !isSaved && setOpen(v)}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn("cursor-pointer", isSaved && "text-primary")}
          aria-label={isSaved ? "Saved" : "Save this word"}
        >
          <Bookmark
            size={16}
            className={cn("transition-all", isSaved && "fill-current")}
          />
          <span>{isSaved && savedCategory ? savedCategory.name : "Save"}</span>
          <ChevronDown size={13} className="opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        {!categories || categories.length === 0 ? (
          <DropdownMenuItem disabled className="text-xs text-muted-foreground">
            No categories yet
          </DropdownMenuItem>
        ) : (
          categories.map((category) => (
            <DropdownMenuItem
              key={category.id}
              onClick={() => handleSelectCategory(category.id)}
              className="flex items-center justify-between gap-2"
            >
              <span>{category.name}</span>
              {savedSuggestion?.category_id === category.id && (
                <Check size={13} className="text-primary" />
              )}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
