"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { PartOfSpeechBadge } from "@/components/PartOfSpeechBadge";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { useSearchShortcut } from "./useSearchShortcut";
import { useWordSearch } from "./useWordSearch";
import { useUserCategories } from "@/queries/categories/useCategories";
import { ROUTES } from "@/constants/routes";
import type { Word } from "@/types/db-aliases";

export const SearchWord = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { results, loading, error, reset } = useWordSearch(query, open);
  const { data: categories } = useUserCategories();
  const router = useRouter();

  const categoryMap = useMemo(
    () => new Map(categories?.map((category) => [category.id, category.name])),
    [categories],
  );

  useSearchShortcut({ key: "k", onToggle: () => setOpen((prev) => !prev) });

  const handleOpenChange = (next: boolean) => {
    setOpen(next);

    if (!next) {
      setQuery("");
      reset();
    }
  };

  const handleSelect = (word: Word) => {
    router.push(ROUTES.WORD_IN_CATEGORY(word.category_id, word.id));
    handleOpenChange(false);
  };

  const emptyContent = loading ? (
    <div className="flex w-full items-center justify-center gap-2">
      <Spinner />
      <span>Searching…</span>
    </div>
  ) : error ? (
    error
  ) : query.trim() ? (
    `No results found for "${query}".`
  ) : (
    "No results found."
  );

  return (
    <div className="flex flex-col gap-4">
      <Button
        onClick={() => setOpen(true)}
        variant="ghost"
        className="cursor-pointer"
        aria-label="Open search (Ctrl+K)"
      >
        <Search className="size-4" />
        <span className="sr-only">Search words</span>
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={handleOpenChange}
        className="md:max-w-lg"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search words or translations…"
            value={query}
            onValueChange={setQuery}
          />

          <CommandList>
            <CommandEmpty>{emptyContent}</CommandEmpty>

            {!loading && !error && results.length > 0 && (
              <CommandGroup
                heading="WORDS"
                className="**:[[cmdk-group-heading]]:uppercase"
              >
                {results.map((word) => (
                  <SearchResultItem
                    key={word.id}
                    word={word}
                    categoryName={categoryMap.get(word.category_id)}
                    onSelect={handleSelect}
                  />
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
};

type SearchResultItemProps = {
  word: Word;
  categoryName?: string;
  onSelect: (word: Word) => void;
};

const SearchResultItem = ({
  word,
  categoryName,
  onSelect,
}: SearchResultItemProps) => {
  return (
    <CommandItem
      value={String(word.id)}
      onSelect={() => onSelect(word)}
      className="cursor-pointer gap-0 [&>svg]:hidden"
    >
      <div className="flex w-full items-center">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-medium">{word.word}</span>
            <PartOfSpeechBadge partOfSpeech={word.part_of_speech} />
          </div>

          <span className="truncate text-sm text-muted-foreground">
            {word.translation}
          </span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {categoryName && (
            <span className="max-w-30 truncate text-xs text-muted-foreground">
              {categoryName}
            </span>
          )}

          <ChevronRight className="text-muted-foreground" />
        </div>
      </div>
    </CommandItem>
  );
};
