"use client";

import { Copy } from "lucide-react";
import { ContextMenuItem } from "@/components/ui/context-menu";
import { useWordContextMenu } from "../WordContextMenuContext";

export const CopyWord = () => {
  const { word } = useWordContextMenu();

  return (
    <ContextMenuItem onSelect={() => handleCopy(word.id)} className="text-sm">
      <Copy className="size-3" />
      Copy
    </ContextMenuItem>
  );
};

const handleCopy = (wordId: number) => {
  console.log("Copy word:", wordId);
};
