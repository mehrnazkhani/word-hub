"use client";

import { useRef, useState } from "react";
import { FolderDown } from "lucide-react";

import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImportWordList } from "@/features/word/word-list/import-word/ImportWordList";
import type { Word } from "@/types/db-aliases";
import { Button } from "@/components/ui/button";
import { ArrowButton } from "@/components/ArrowButton";

export const ImportTrigger = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [key, setKey] = useState(0);
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [words, setWords] = useState<Word[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        setFileName(parsed.category ?? "Import File");
        setWords(parsed.words ?? []);
      } catch {
        setFileName("Import File");
        setWords([]);
      }
    };
    reader.readAsText(file);

    setOpen(true);
    setKey((k) => k + 1);
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="flex max-h-150! max-w-2xl! flex-col overflow-hidden"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>
              {fileName ?? "Import File"} · {words.length} words
            </DialogTitle>
            <DialogDescription className="sr-only">
              Only files exported from this app are supported.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto">
            <ImportWordList words={words} />
          </div>

          <DialogFooter>
            <ArrowButton className="cursor-pointer">
              Import Category
            </ArrowButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
