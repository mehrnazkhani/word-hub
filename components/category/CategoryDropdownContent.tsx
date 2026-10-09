"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useUserCategories } from "@/queries/categories/useCategories";

type CategoryDropdownContentProps = {
  selectedId?: number | null;
  onSelect: (categoryId: number) => void;
  align?: "start" | "center" | "end";
  className?: string;
};

export const CategoryDropdownContent = ({
  selectedId,
  onSelect,
  align = "end",
  className,
}: CategoryDropdownContentProps) => {
  const { data: categories } = useUserCategories();

  return (
    <DropdownMenuContent align={align} className={cn("h-80!", className)}>
      {!categories || categories.length === 0 ? (
        <DropdownMenuItem disabled className="text-xs text-muted-foreground">
          No categories yet
        </DropdownMenuItem>
      ) : (
        categories.map((category) => (
          <DropdownMenuItem
            key={category.id}
            onClick={() => onSelect(category.id)}
            className="flex items-center justify-between gap-2"
          >
            <span className="min-w-0 flex-1 truncate">{category.name}</span>
            {selectedId === category.id && (
              <Check size={13} className="shrink-0 text-primary" />
            )}
          </DropdownMenuItem>
        ))
      )}
    </DropdownMenuContent>
  );
};
