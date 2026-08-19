"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { Bookmark, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
              onClick={() => saveToCategory(category.id)}
              className="flex items-center justify-between gap-2"
            >
              <span>{category.name}</span>
              {savedCategoryId === category.id && (
                <Check size={13} className="text-primary" />
              )}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
