"use client";

import { Eye } from "lucide-react";
import { ContextMenuItem } from "@/components/ui/context-menu";
import { useWordContextMenu } from "../WordContextMenuContext";

export const ShowInCategory = () => {
  const { word } = useWordContextMenu();

  return (
    <ContextMenuItem onSelect={() => handleShowInCategory(word.id)}>
      <Eye className="size-3" />
      Show in category
    </ContextMenuItem>
  );
};

const handleShowInCategory = (wordId: number) => {
  console.log("Show in category:", wordId);
};
