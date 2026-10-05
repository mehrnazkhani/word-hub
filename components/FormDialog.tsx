"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FooterSlotProvider } from "@/components/FormFooterSlot";

type FormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
};

export const FormDialog = ({
  open,
  onOpenChange,
  title,
  description,
  children,
}: FormDialogProps) => {
  const [footerEl, setFooterEl] = React.useState<HTMLElement | null>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex max-h-[90vh] flex-col sm:max-w-106.25"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
          <DialogDescription className="sr-only">
            {description}
          </DialogDescription>
        </DialogHeader>

        <FooterSlotProvider value={footerEl}>
          <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        </FooterSlotProvider>

        <div
          ref={setFooterEl}
          className="-mx-4 -mb-4 rounded-b-xl border-t bg-popover p-4 empty:hidden"
        />
      </DialogContent>
    </Dialog>
  );
};
