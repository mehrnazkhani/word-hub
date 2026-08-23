"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useSupabase } from "@/lib/supabase/useSupabase";
import { useUser } from "@/components/providers/user-provider";
import { useCategoryContextMenu } from "../CategoryContextMenuContext";
import { activeWordsQuery } from "@/queries/words/useActiveWords";
import { mapWordToExportShape } from "@/lib/utils/mapWordToExportShape";
import { downloadJson } from "@/lib/utils/downloadJson";

import { toast } from "sonner";
import { Download } from "lucide-react";
import { ContextMenuItem } from "@/components/ui/context-menu";

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
        activeWordsQuery({
          supabase,
          userId: user.id,
          categoryId: category.id,
        }),
      );

      if (!words?.length) {
        toast.error("No words found to export.", { id: toastId });
        return;
      }

      const exportData = {
        category: category.name,
        words: words.map(mapWordToExportShape),
      };

      downloadJson(exportData, `${category.name}.json`);

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
    <ContextMenuItem onSelect={handleExport}>
      <Download className="size-3" />
      Export
    </ContextMenuItem>
  );
};
