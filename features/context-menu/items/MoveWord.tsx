"use client";

import { Check, FolderOutput } from "lucide-react";
import {
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "@/components/ui/context-menu";
import { useUserCategories } from "@/queries/categories/useCategories";
import { useWordContextMenu } from "../WordContextMenuContext";

export const MoveWord = () => {
  const { data: categories, isPending } = useUserCategories();
  const { word } = useWordContextMenu();

  return (
    <ContextMenuSub>
      <ContextMenuSubTrigger className="text-sm">
        <FolderOutput className="size-3" />
        Move
      </ContextMenuSubTrigger>
      <ContextMenuSubContent className="max-h-72 w-52 overflow-y-auto p-2">
        {categories &&
          categories.map((category) => {
            const isCurrentCategory = category.id === word.category_id;
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
  );
};

const handleMove = (wordId: number, targetCategoryId: number) => {
  console.log("Move word:", { wordId, targetCategoryId });
};
