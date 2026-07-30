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
import { useMoveWordMutation } from "@/queries/words/move/useMoveWord.mutation";

export const MoveWord = () => {
  const { data: categories, isPending } = useUserCategories();
  const { word } = useWordContextMenu();
  const { mutate: moveWord } = useMoveWordMutation();

  return (
    <ContextMenuSub>
      <ContextMenuSubTrigger
        disabled={isPending || !categories?.length}
        className="text-sm"
      >
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
                onSelect={() =>
                  moveWord({
                    word: word,
                    toCategoryId: category.id,
                  })
                }
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
