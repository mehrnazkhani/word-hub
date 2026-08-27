"use client";

import { useRouter } from "next/navigation";

import { Eye } from "lucide-react";
import { ContextMenuItem } from "@/components/ui/context-menu";
import { useWordContextMenu } from "../WordContextMenuContext";
import { ROUTES } from "@/constants/routes";

export const ShowInCategory = () => {
  const { word } = useWordContextMenu();
  const router = useRouter();

  const handleShowInCategory = () => {
    router.push(ROUTES.WORD_IN_CATEGORY(word.category_id, word.id));
  };

  return (
    <ContextMenuItem onSelect={handleShowInCategory}>
      <Eye className="size-3" />
      Show in category
    </ContextMenuItem>
  );
};
