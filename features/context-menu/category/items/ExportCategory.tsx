"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useSupabase } from "@/lib/supabase/useSupabase";
import { useUser } from "@/components/providers/user-provider";
import { useCategoryContextMenu } from "../CategoryContextMenuContext";

import { toast } from "sonner";
import { Download } from "lucide-react";
import { ContextMenuItem } from "@/components/ui/context-menu";
import { activeWordsQueryOptions } from "@/queries/words/useActiveWords";

export const ExportCategory = () => {
  const { category } = useCategoryContextMenu();
  const queryClient = useQueryClient();
  const supabase = useSupabase();
  const { user } = useUser();

  const handleExport = async () => {
    if (!user) return;

    const toastId = toast.loading(`Exporting "${category.name}"...`);

    try {
      const words = await queryClient.fetchQuery(
        activeWordsQueryOptions(category.id, user.id, supabase),
      );

      if (!words?.length) {
        toast.error("No words found to export.", { id: toastId });
        return;
      }

      const exportData = {
        category: category.name,
        words: words.map(
          ({
            word,
            source_language_id,
            translation,
            target_language_id,
            part_of_speech,
            antonyms,
            synonyms,
            example,
            description,
          }) => ({
            word,
            source_language_id,
            translation,
            target_language_id,
            ...(part_of_speech && { part_of_speech }),
            ...(synonyms?.length && { synonyms }),
            ...(antonyms?.length && { antonyms }),
            ...(example && { example }),
            ...(description && { description }),
          }),
        ),
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: "application/json",
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${category.name}.json`;
      a.click();
      URL.revokeObjectURL(url);

      toast.success(
        `"${category.name}" exported successfully — ${words.length} words.`,
        { id: toastId },
      );
    } catch {
      toast.error("Something went wrong while exporting. Please try again.", {
        id: toastId,
      });
    }
  };

  return (
    <ContextMenuItem onSelect={handleExport} className="text-xs">
      <Download className="size-3" />
      Export
    </ContextMenuItem>
  );
};
