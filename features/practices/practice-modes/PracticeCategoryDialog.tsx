"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowButton } from "@/components/ArrowButton";
import {
  PracticeCategoryList,
  type SelectedCategory,
  type CategoryId,
} from "./PracticeCategoryList";
import { MIN_WORDS_REQUIRED } from "@/constants/practice-modes";

type PracticeCategoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: (categoryId: CategoryId) => void;
};

export const PracticeCategoryDialog = ({
  open,
  onOpenChange,
  onContinue,
}: PracticeCategoryDialogProps) => {
  const [selected, setSelected] = useState<SelectedCategory | null>(null);

  const handleContinue = () => {
    if (selected === null) return;

    if (selected.id !== "mixed") {
      if (selected.wordCount === 0 || selected.wordCount === null) {
        toast.error("This category has no words yet. Add some words first.");
        return;
      }

      if (selected.wordCount < MIN_WORDS_REQUIRED) {
        toast.warning(
          `This category only has ${selected.wordCount} word${selected.wordCount === 1 ? "" : "s"}. Add at least ${MIN_WORDS_REQUIRED} to start practicing.`,
        );
        return;
      }
    }

    onContinue(selected.id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="flex max-h-120 flex-col"
      >
        <DialogHeader>
          <DialogTitle>Select a category</DialogTitle>
          <DialogDescription className="text-xs">
            Choose a category to practice. Categories need at least{" "}
            {MIN_WORDS_REQUIRED} words to start.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto">
          {open && (
            <PracticeCategoryList
              selectedId={selected?.id ?? "mixed"}
              onSelect={setSelected}
            />
          )}
        </div>

        <DialogFooter>
          <ArrowButton
            onClick={handleContinue}
            disabled={selected === null}
            className="w-fit self-end"
          >
            Continue
          </ArrowButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
