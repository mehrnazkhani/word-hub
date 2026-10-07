"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useSupabase } from "@/lib/supabase/useSupabase";
import { useUser } from "@/components/providers/user-provider";
import { getAllActiveWords } from "@/queries/words/getWords";
import { categoriesQuery } from "@/queries/categories/useCategories";

import { toast } from "sonner";
import { Download } from "lucide-react";
import { SettingRow } from "../SettingRow";
import { LoadingButton } from "@/components/LoadingButton";
import { mapWordToExportShape } from "@/lib/utils/mapWordToExportShape";
import { downloadJson } from "@/lib/utils/downloadJson";

export const ExportData = () => {
  const queryClient = useQueryClient();
  const supabase = useSupabase();
  const { user } = useUser();

  const handleExportAll = async () => {
    if (!user) return;

    const toastId = toast.loading("Preparing your export...");

    try {
      const [categoriesResult, wordsResult] = await Promise.all([
        queryClient.fetchQuery(categoriesQuery({ supabase, userId: user.id })),
        getAllActiveWords({ client: supabase, userId: user.id }),
      ]);

      if (!categoriesResult?.length) {
        toast.error("No categories found to export.", { id: toastId });
        return;
      }

      if (wordsResult.error) throw wordsResult.error;

      const words = wordsResult.data ?? [];

      const wordsByCategory = words.reduce<Record<number, typeof words>>(
        (acc, word) => {
          const key = word.category_id;
          if (!acc[key]) acc[key] = [];
          acc[key].push(word);
          return acc;
        },
        {},
      );

      const exportData = categoriesResult.map((category) => ({
        category: category.name,
        words: (wordsByCategory[category.id] ?? []).map(mapWordToExportShape),
      }));

      downloadJson(
        exportData,
        `wordHub-export-${new Date().toISOString().slice(0, 10)}.json`,
      );

      toast.success(
        `Exported ${categoriesResult.length} categories — ${words.length} words.`,
        { id: toastId },
      );
    } catch {
      toast.error("Something went wrong while exporting. Please try again.", {
        id: toastId,
      });
    }
  };

  return (
    <SettingRow
      icon={{ icon: Download }}
      title="Export Data"
      description="Download all your categories and words as a JSON file."
    >
      <LoadingButton variant="outline" onClick={handleExportAll}>
        Export Data
      </LoadingButton>
    </SettingRow>
  );
};
