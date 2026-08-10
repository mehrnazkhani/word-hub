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

export const ImportTrigger = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [key, setKey] = useState(0);
  const [open, setOpen] = useState(false);
  const [importData, setImportData] = useState<ImportFileShape | null>(null);

  const { mutate: importCategoryMutation, isPending } =
    useImportCategoryMutation();

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
