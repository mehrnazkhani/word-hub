"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { Bookmark, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CategoryDropdownContent } from "@/components/category/CategoryDropdownContent";

import { useUserCategories } from "@/queries/categories/useCategories";
import { useSaveDailyWordSuggestion } from "./useSaveDailyWordSuggestion";

import type { Word } from "@/types/db-aliases";
export type SavedSuggestion = { id: number; category_id: number } | null;

type SaveWordButtonProps = {
  savedSuggestion: SavedSuggestion;
  word: Word;
};

export const SaveWordButton = ({
  savedSuggestion,
  word,
}: SaveWordButtonProps) => {
  const { data: categories } = useUserCategories();
  const { isSaved, saveToCategory } = useSaveDailyWordSuggestion({
    word,
    savedSuggestion,
  });
  const [open, setOpen] = useState(false);

  const savedCategory = categories?.find(
    (c) => c.id === savedSuggestion?.category_id,
  );

  const savedCategoryId = savedSuggestion?.category_id;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "max-w-full min-w-0 shrink cursor-pointer overflow-hidden",
            isSaved && "text-primary",
          )}
          aria-label={isSaved ? "Saved" : "Save this word"}
        >
          <Bookmark
            size={16}
            className={cn("shrink-0 transition-all", isSaved && "fill-current")}
          />
          <span className="min-w-0 truncate">
            {isSaved && savedCategory ? savedCategory.name : "Save"}
          </span>
          <ChevronDown size={13} className="shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <CategoryDropdownContent
        align="end"
        selectedId={savedCategoryId}
        onSelect={saveToCategory}
      />
    </DropdownMenu>
  );
};
