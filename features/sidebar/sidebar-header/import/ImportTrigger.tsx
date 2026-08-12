"use client";

import { useRef, useState } from "react";
import { FolderDown } from "lucide-react";
import { toast } from "sonner";

import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowButton } from "@/components/ArrowButton";
import { ImportWordList } from "@/features/word/word-list/import-word/ImportWordList";
import { parseImportFile, type ImportFileShape } from "./parseImportFile";
import { useImportCategoryMutation } from "./useImportCategoryMutation";
import { readJson } from "@/lib/utils/readJson";
import { mapWordToImportShape } from "@/lib/utils/mapWordToImportShape";
import { useWordCount } from "@/queries/words/count/useWordCount";
import { useCategoryCount } from "@/queries/categories/useCategoryCount";
import { APP_LIMITS } from "@/constants/app-limits";

export const ImportTrigger = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [key, setKey] = useState(0);
  const [open, setOpen] = useState(false);
  const [importData, setImportData] = useState<ImportFileShape | null>(null);

  const { data: wordCount } = useWordCount();
  const categoryCount = useCategoryCount();

  const { mutate: importCategoryMutation, isPending } =
    useImportCategoryMutation();

  const getImportLimitError = (): string | null => {
    if (categoryCount >= APP_LIMITS.category_limit_per_user) {
      return `You've reached the category limit (${APP_LIMITS.category_limit_per_user}). Delete a category before importing.`;
    }

    const totalWords = (wordCount ?? 0) + importData!.words.length;
    if (totalWords > APP_LIMITS.word_limit_per_user) {
      const available = APP_LIMITS.word_limit_per_user - (wordCount ?? 0);
      return `This import adds ${importData!.words.length} words but you only have room for ${available} more (limit: ${APP_LIMITS.word_limit_per_user}).`;
    }

    return null;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const raw = await readJson(file);
      const parsed = parseImportFile(raw);
      setImportData(parsed);
      setOpen(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to read file.");
      setKey((k) => k + 1);
    }
  };

  const handleImport = () => {
    if (!importData) return;

    const error = getImportLimitError();
    if (error) {
      toast.error(error);
      return;
    }

    importCategoryMutation(
      {
        category: importData.category,
        words: importData.words.map((word) =>
          mapWordToImportShape({ word, categoryId: 0 }),
        ),
      },
      {
        onSuccess: () => {
          setOpen(false);
          setImportData(null);
          setKey((k) => k + 1);
        },
      },
    );
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      setImportData(null);
      setKey((k) => k + 1);
    }
  };

  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton
          className="cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <FolderDown />
          <span>Import File</span>
        </SidebarMenuButton>

        <input
          key={key}
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={handleFileChange}
        />
      </SidebarMenuItem>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          className="flex max-h-150! max-w-2xl! flex-col overflow-hidden"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Import File</DialogTitle>

            <DialogDescription className="sr-only">
              Only files exported from this app are supported.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto">
            {importData && <ImportWordList words={importData.words} />}
          </div>

          <DialogFooter>
            <ArrowButton
              className="cursor-pointer"
              onClick={handleImport}
              disabled={isPending}
            >
              {isPending ? "Importing..." : "Import Category"}
            </ArrowButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
