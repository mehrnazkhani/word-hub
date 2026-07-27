"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useSupabase } from "@/lib/supabase/useSupabase";
import { useUser } from "@/components/providers/user-provider";
import { getAllActiveWords } from "@/queries/words/getWords";
import { categoriesQuery } from "@/queries/categories/useCategories";

import { toast } from "sonner";
import { Download } from "lucide-react";
import { SettingRow } from "../SettingRow";
import { ArrowButton } from "@/components/ArrowButton";

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
        words: (wordsByCategory[category.id] ?? []).map(
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
      }));

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `wordHub-export-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);

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
      <ArrowButton onClick={handleExportAll}>Export Data</ArrowButton>
    </SettingRow>
  );
};
