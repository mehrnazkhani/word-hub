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

type WordContextMenuProps = {
  children: ReactNode;
  currentCategoryId?: number | null;
  onCopy: () => void;
  onEdit: () => void;
  onMove: (categoryId: number) => void;
  onDelete: () => void;
};

export const WordContextMenu = ({
  children,
  currentCategoryId,
  onCopy,
  onEdit,
  onMove,
  onDelete,
}: WordContextMenuProps) => {
  const categories = useCategoriesStore((state) => state.categories);

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="p-2">
        <ContextMenuItem onSelect={onCopy} className="text-xs">
          <Copy className="size-3" />
          Copy
        </ContextMenuItem>
        <ContextMenuItem onSelect={onEdit} className="text-xs">
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
                  onSelect={() => onMove(category.id)}
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
          onSelect={onDelete}
          className="text-xs"
        >
          <Trash2 className="size-3" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
