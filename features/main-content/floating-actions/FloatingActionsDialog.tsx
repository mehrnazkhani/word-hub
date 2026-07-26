"use client";

import dynamic from "next/dynamic";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const AddWordForm = dynamic(() => import("../../word/add-word/AddWordForm"), {
  loading: () => <div className="py-8 text-center">Loading form...</div>,
});

const CreateCategoryForm = dynamic(
  () => import("../../category/CreateCategoryForm"),
  {
    loading: () => <div className="py-8 text-center">Loading form...</div>,
  },
);

type ActiveModal = "add-word" | "create-category" | null;

interface FloatingActionsDialogProps {
  activeModal: ActiveModal;
  onClose: () => void;
}

const modalConfig: Record<
  NonNullable<ActiveModal>,
  {
    title: string;
    description: string;
    Component: React.ComponentType;
  }
> = {
  "add-word": {
    title: "Add word",
    description:
      "Add a new word to your dictionary with its meaning, pronunciation, and examples.",
    Component: AddWordForm,
  },
  "create-category": {
    title: "Create category",
    description:
      "Create a new category to better organize your words and vocabulary.",
    Component: CreateCategoryForm,
  },
};

export const FloatingActionsDialog = ({
  activeModal,
  onClose,
}: FloatingActionsDialogProps) => {
  if (!activeModal) return null;

  const { title, description, Component } = modalConfig[activeModal];

  return (
    <Dialog
      open={activeModal !== null}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogContent
        onPointerDownOutside={(event) => event.preventDefault()}
        onEscapeKeyDown={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="sr-only">
            {description}
          </DialogDescription>
        </DialogHeader>
        <Component />
      </DialogContent>
    </Dialog>
  );
};
