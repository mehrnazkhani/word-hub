"use client";

import type { ReactNode } from "react";
import { Check, Copy, Pencil, FolderOutput, Trash2 } from "lucide-react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { useCategoriesStore } from "@/stores/categories.store";
import { Word } from "@/types/db-aliases";

type CategoryWordContextMenuProps = {
  word: Word;
  currentCategoryId?: number | null;
  children: ReactNode;
};

export const CategoryWordContextMenu = ({
  word,
  currentCategoryId,
  children,
}: CategoryWordContextMenuProps) => {
  const categories = useCategoriesStore((state) => state.categories);

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="p-2">
        <ContextMenuItem
          onSelect={() => handleCopy(word.id)}
          className="text-xs"
        >
          <Copy className="size-3" />
          Copy
        </ContextMenuItem>
        <ContextMenuItem
          onSelect={() => handleEdit(word.id)}
          className="text-xs"
        >
          <Pencil className="size-3" />
          Edit
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger className="text-xs">
            <FolderOutput className="size-3" />
            Move
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="max-h-72 w-52 overflow-y-auto p-2">
            {categories.map((category) => {
              const isCurrentCategory = category.id === currentCategoryId;
              return (
                <ContextMenuItem
                  key={category.id}
                  disabled={isCurrentCategory}
                  onSelect={() => handleMove(word.id, category.id)}
                  className="text-xs"
                >
                  <span className="truncate">{category.name}</span>
                  {isCurrentCategory && <Check className="ml-auto" />}
                </ContextMenuItem>
              );
            })}
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem
          variant="destructive"
          onSelect={() => handleDelete(word.id)}
          className="text-xs"
        >
          <Trash2 className="size-3" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

const handleCopy = (wordId: number) => {
  console.log("Copy word:", wordId);
};

const handleEdit = (wordId: number) => {
  console.log("Edit word:", wordId);
};

const handleMove = (wordId: number, targetCategoryId: number) => {
  console.log("Move word:", { wordId, targetCategoryId });
};

const handleDelete = (wordId: number) => {
  console.log("Delete word:", wordId);
};

// const handleCopy = useCallback((wordId: number) => {
//   console.log("Copy word:", wordId);
// }, []);
// const handleEdit = useCallback((wordId: number) => {
//   console.log("Edit word:", wordId);
// }, []);
// const handleMove = useCallback((wordId: number, targetCategoryId: number) => {
//   console.log("Move word:", { wordId, targetCategoryId });
// }, []);
// const handleDelete = useCallback((wordId: number) => {
//   console.log("Delete word:", wordId);
// }, []);
