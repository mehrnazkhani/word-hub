"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { useDebounce } from "@/hooks/useDebounce";
import { useSearchShortcut } from "./useSearchShortcut";
import { fetchSearchedWords } from "@/lib/api/words.api";
import { ROUTES } from "@/constants/routes";
import type { Word } from "@/types/db-aliases";

export const SearchWord = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, 300);
  const router = useRouter();

  useSearchShortcut({ key: "k", onToggle: () => setOpen((prev) => !prev) });

  useEffect(() => {
    if (!open) return;

    if (!debouncedQuery.trim()) {
      setResults([]);
      setError(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    setLoading(true);
    setError(null);

    fetchSearchedWords({
      query: debouncedQuery,
      signal: controller.signal,
      limit: 15,
    })
      .then((data) => setResults(data))
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError("Search failed. Please try again.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [debouncedQuery, open]);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      setQuery("");
      setResults([]);
      setError(null);
      setLoading(false);
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
        <Search className="h-4 w-4" />
        <span className="sr-only">Search words</span>
      </Button>

      <CommandDialog open={open} onOpenChange={handleOpenChange}>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search words or translations…"
            value={query}
            onValueChange={setQuery}
          />

          <CommandList>
            <CommandEmpty>{emptyContent}</CommandEmpty>

            {!loading && !error && results.length > 0 && (
              <CommandGroup heading="Words">
                {results.map((word) => (
                  <CommandItem
                    key={word.id}
                    value={String(word.id)}
                    onSelect={() => handleSelect(word)}
                    className="cursor-pointer gap-0 [&>svg]:hidden"
                  >
                    <div className="flex w-full items-center">
                      <div className="flex items-center gap-4">
                        <span className="font-medium">{word.word}</span>
                        <span className="truncate text-sm text-muted-foreground">
                          {word.translation}
                        </span>
                      </div>

                      <ArrowRight className="ml-auto text-muted-foreground" />
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
};
