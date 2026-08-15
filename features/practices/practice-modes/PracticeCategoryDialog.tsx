"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowButton } from "@/components/ArrowButton";
import { PracticeCategoryList, type CategoryId } from "./PracticeCategoryList";

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
  const [selectedId, setSelectedId] = useState<CategoryId | null>(null);

  const handleContinue = () => {
    if (selectedId === null) return;
    onContinue(selectedId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-150 flex-col">
        <DialogHeader>
          <DialogTitle>Select a category</DialogTitle>
          <DialogDescription className="sr-only">
            Select a category to practice
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto">
          <PracticeCategoryList
            selectedId={selectedId ?? "mixed"}
            onSelect={setSelectedId}
          />
        </div>

        <DialogFooter>
          <ArrowButton onClick={handleContinue} disabled={selectedId === null}>
            Continue
          </ArrowButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
