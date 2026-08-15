"use client";

import { useEffect, useMemo, useState } from "react";

import { CategoryId } from "../PracticeCategoryList";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { PracticeModeWords } from "../validatePracticeMode";

type Props = {
  categoryId: CategoryId;
  words: PracticeModeWords;
};

type MatchStatus = "incorrect" | "correct";

const FONT_SIZE_THRESHOLD = 30;
const PAGE_SIZE = 5;

export const MatchingPractice = ({ categoryId, words }: Props) => {
  const [shuffledWords, setShuffledWords] = useState(words);
  const [selectedWord, setSelectedWord] = useState<number | null>(null);
  const [selectedTranslation, setSelectedTranslation] = useState<number | null>(
    null,
  );
  const [matchStatuses, setMatchStatuses] = useState<
    Record<number, MatchStatus>
  >({});
  const [page, setPage] = useState(0);

  const visibleWords = shuffledWords.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE,
  );
  const visibleTranslations = useMemo(
    () => [...visibleWords].sort(() => Math.random() - 0.5),
    [page, shuffledWords],
  );

  useEffect(() => {
    setShuffledWords([...words].sort(() => Math.random() - 0.5));
  }, [words]);

  const handleWordSelect = (id: number) => {
    const newSelected = selectedWord === id ? null : id;
    setSelectedWord(newSelected);

    if (newSelected && selectedTranslation) {
      validate(newSelected, selectedTranslation);
    }
  };

  const handleTranslationSelect = (id: number) => {
    const newSelected = selectedTranslation === id ? null : id;
    setSelectedTranslation(newSelected);

    if (selectedWord && newSelected) {
      validate(selectedWord, newSelected);
    }
  };

  const validate = (wordId: number, translationId: number) => {
    if (wordId === translationId) {
      const newStatuses = {
        ...matchStatuses,
        [wordId]: "correct" as MatchStatus,
      };
      setMatchStatuses(newStatuses);
      setSelectedWord(null);
      setSelectedTranslation(null);

      const currentPageIds = visibleWords.map((w) => w.id);
      const allMatched = currentPageIds.every(
        (id) => newStatuses[id] === "correct",
      );
      if (allMatched) {
        setTimeout(() => setPage((prev) => prev + 1), 500);
      }
    } else {
      setMatchStatuses((prev) => ({
        ...prev,
        [wordId]: "incorrect",
        [translationId]: "incorrect",
      }));
      setTimeout(() => {
        setMatchStatuses((prev) => {
          const next = { ...prev };
          delete next[wordId];
          delete next[translationId];
          return next;
        });
        setSelectedWord(null);
        setSelectedTranslation(null);
      }, 500);
    }
  };

  return (
    <div className="mx-auto flex min-h-dvh max-w-4xl flex-col px-5">
      <header className="py-[clamp(24px,6vh,64px)]">
        <Progress />
      </header>

      <main className="grid flex-1 grid-cols-2 items-center gap-6">
        <MatchingColumn
          items={visibleTranslations.map((w) => ({
            id: w.id,
            label: w.translation!,
          }))}
          selectedId={selectedTranslation}
          onSelect={handleTranslationSelect}
          matchStatuses={matchStatuses}
        />
        <MatchingColumn
          items={visibleWords.map((w) => ({ id: w.id, label: w.word }))}
          selectedId={selectedWord}
          onSelect={handleWordSelect}
          matchStatuses={matchStatuses}
        />
      </main>

      <footer className="py-[clamp(24px,6vh,64px)]">
        <Button className="w-full cursor-pointer">Continue</Button>
      </footer>
    </div>
  );
};

type MatchingColumnItem = {
  id: number;
  label: string;
};

type MatchingColumnProps = {
  items: MatchingColumnItem[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  matchStatuses: Record<number, MatchStatus>;
};

const MatchingColumn = ({
  items,
  selectedId,
  onSelect,
  matchStatuses,
}: MatchingColumnProps) => (
  <div className="flex min-w-72 flex-col gap-3">
    {items.map((item) => (
      <Button
        key={item.id}
        variant={selectedId === item.id ? "secondary" : "outline"}
        className={cn(
          "h-14 w-full cursor-pointer truncate",
          item.label.length > FONT_SIZE_THRESHOLD ? "text-xs" : "text-sm",
          matchStatuses[item.id] === "correct" &&
            "cursor-default bg-muted hover:bg-muted",
          matchStatuses[item.id] === "incorrect" &&
            "cursor-pointer bg-destructive/20 hover:bg-destructive/20",
        )}
        disabled={matchStatuses[item.id] === "correct"}
        onClick={() => onSelect(item.id)}
      >
        {item.label}
      </Button>
    ))}
  </div>
);
