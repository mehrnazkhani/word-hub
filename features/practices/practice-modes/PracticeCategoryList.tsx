"use client";

import { Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserCategories } from "@/queries/categories/useCategories";

export type CategoryId = "mixed" | number;

type MixedCategory = {
  id: "mixed";
  name: string;
};

type CategoryItem =
  | MixedCategory
  | NonNullable<ReturnType<typeof useUserCategories>["data"]>[number];

const MIXED_CATEGORY: MixedCategory = {
  id: "mixed",
  name: "Mixed Practice",
};

type CategoryRowProps = {
  item: CategoryItem;
  isSelected: boolean;
  onSelect: (id: CategoryId) => void;
};

const CategoryRow = ({ item, isSelected, onSelect }: CategoryRowProps) => {
  const isMixed = item.id === "mixed";

  return (
    <Button
      type="button"
      variant={isSelected ? "secondary" : "ghost"}
      onClick={() => onSelect(item.id as CategoryId)}
      className="w-full cursor-pointer text-left"
    >
      {isMixed && <Shuffle className="size-3" />}
      <span className="flex-1 truncate">{item.name}</span>
    </Button>
  );
};

type PracticeCategoryListProps = {
  selectedId: CategoryId;
  onSelect: (id: CategoryId) => void;
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
