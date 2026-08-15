"use client";

import { Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserCategories } from "@/queries/categories/useCategories";
import type { CategoryWithWordCount } from "@/types/db-aliases";

export type CategoryId = "mixed" | number;

export type SelectedCategory = {
  id: CategoryId;
  wordCount: number | null;
};

type MixedCategory = {
  id: "mixed";
  name: string;
  wordCount: null;
};

type CategoryItem = MixedCategory | CategoryWithWordCount;

const MIXED_CATEGORY: MixedCategory = {
  id: "mixed",
  name: "Mixed Practice",
  wordCount: null,
};

type CategoryRowProps = {
  item: CategoryItem;
  isSelected: boolean;
  onSelect: (selected: SelectedCategory) => void;
};

const CategoryRow = ({ item, isSelected, onSelect }: CategoryRowProps) => {
  const isMixed = item.id === "mixed";

  return (
    <Button
      type="button"
      variant={isSelected ? "secondary" : "ghost"}
      onClick={() =>
        onSelect({ id: item.id as CategoryId, wordCount: item.wordCount })
      }
      className="w-full cursor-pointer justify-between"
    >
      <div className="flex min-w-0 items-center gap-2">
        {isMixed && <Shuffle className="size-3 shrink-0" />}
        <span className="truncate">{item.name}</span>
      </div>

      {item.wordCount !== null && (
        <span className="shrink-0 text-xs text-muted-foreground">
          {item.wordCount}
        </span>
      )}
    </Button>
  );
};

type PracticeCategoryListProps = {
  selectedId: CategoryId;
  onSelect: (selected: SelectedCategory) => void;
};

export const PracticeCategoryList = ({
  selectedId,
  onSelect,
}: PracticeCategoryListProps) => {
  const { data: categories, isPending } = useUserCategories();

  const allItems: CategoryItem[] = [MIXED_CATEGORY, ...(categories ?? [])];

  if (isPending) {
    return (
      <>
        {Array.from({ length: 5 }).map((_, index) => (
          <Button key={index} variant="ghost" className="w-full" asChild>
            <Skeleton
              className="h-8"
              style={{
                backgroundColor: `color-mix(in srgb, var(--muted) ${
                  100 - index * 7
                }%, transparent)`,
              }}
            />
          </Button>
        ))}
      </>
    );
  }

  return (
    <>
      {allItems.map((item) => (
        <CategoryRow
          key={item.id}
          item={item}
          isSelected={selectedId === item.id}
          onSelect={onSelect}
        />
      ))}
    </>
  );
};
