"use client";

import dynamic from "next/dynamic";
import { FormDialog } from "@/components/FormDialog";

type FormProps = {
  onSuccess: () => void;
};

const AddWordForm = dynamic<FormProps>(
  () => import("../../word/form/AddWordForm"),
  {
    loading: () => <div className="py-8 text-center">Loading form...</div>,
  },
);

const CreateCategoryForm = dynamic<FormProps>(
  () => import("../../category/form/CreateCategoryForm"),
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
    Component: React.ComponentType<{ onSuccess: () => void }>;
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
    <FormDialog
      open
      onOpenChange={(open) => !open && onClose()}
      title={title}
      description={description}
    >
      <Component onSuccess={onClose} />
    </FormDialog>
  );
};
