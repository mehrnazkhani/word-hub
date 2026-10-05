"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { toast } from "sonner";

import { FormDrawerDialog } from "@/components/FormDrawerDialog";
import { FormFooter } from "@/components/FormFooter";
import { LoadingButton } from "@/components/LoadingButton";
import { ImportWordList } from "@/features/word/word-list/import-word/ImportWordList";
import { useImportCategoryMutation } from "./useImportCategoryMutation";
import { mapWordToImportShape } from "@/lib/utils/mapWordToImportShape";
import { useWordCount } from "@/queries/words/count/useWordCount";
import { useCategoryCount } from "@/queries/categories/useCategoryCount";
import { APP_LIMITS } from "@/constants/app-limits";
import type { ImportFileShape } from "./parseImportFile";

type ImportContextValue = {
  openImport: (data: ImportFileShape) => void;
};

const ImportContext = createContext<ImportContextValue | null>(null);

export const useImportDialog = () => {
  const ctx = useContext(ImportContext);
  if (!ctx) {
    throw new Error("useImportDialog must be used within ImportProvider.");
  }
  return ctx;
};

export const ImportProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [importData, setImportData] = useState<ImportFileShape | null>(null);

  const { data: wordCount } = useWordCount();
  const categoryCount = useCategoryCount();

  const { mutate: importCategoryMutation, isPending } =
    useImportCategoryMutation();

  const openImport = useCallback((data: ImportFileShape) => {
    setImportData(data);
    setOpen(true);
  }, []);

  const getImportLimitError = (): string | null => {
    if (!importData) return null;
    if (categoryCount >= APP_LIMITS.category_limit_per_user) {
      return `You've reached the category limit (${APP_LIMITS.category_limit_per_user}). Delete a category before importing.`;
    }

    const totalWords = (wordCount ?? 0) + importData.words.length;
    if (totalWords > APP_LIMITS.word_limit_per_user) {
      const available = APP_LIMITS.word_limit_per_user - (wordCount ?? 0);
      return `This import adds ${importData.words.length} words but you only have room for ${available} more (limit: ${APP_LIMITS.word_limit_per_user}).`;
    }

    return null;
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
        },
      },
    );
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      setImportData(null);
    }
  };

  return (
    <ImportContext.Provider value={{ openImport }}>
      {children}

      <FormDrawerDialog
        open={open}
        onOpenChange={handleOpenChange}
        title="Import File"
        description="Only files exported from this app are supported."
        contentClassName="scroll-fade"
      >
        {importData && <ImportWordList words={importData.words} />}

        <FormFooter>
          <LoadingButton
            className="w-full"
            onClick={handleImport}
            isLoading={isPending}
          >
            {isPending ? "Importing..." : "Import Category"}
          </LoadingButton>
        </FormFooter>
      </FormDrawerDialog>
    </ImportContext.Provider>
  );
};
