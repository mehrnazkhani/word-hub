"use client";

import * as React from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

const FooterSlotContext = React.createContext<HTMLElement | null>(null);

export const useFooterSlot = () => React.useContext(FooterSlotContext);

interface FormDrawerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function FormDrawerDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
}: FormDrawerDialogProps) {
  const isMobile = useIsMobile();

  const [footerEl, setFooterEl] = React.useState<HTMLElement | null>(null);

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange} disablePointerDismissal>
        <DrawerContent className="h-[90dvh] max-h-[90dvh] data-[vaul-drawer-direction=bottom]:max-h-[90dvh]">
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
            {description && (
              <DrawerDescription className="sr-only">
                {description}
              </DrawerDescription>
            )}
            <DrawerClose className="absolute inset-e-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100">
              <X className="size-4" />
              <span className="sr-only">Close</span>
            </DrawerClose>
          </DrawerHeader>

          <FooterSlotContext.Provider value={footerEl}>
            <div className="min-h-0 flex-1 overflow-y-auto p-4">{children}</div>
          </FooterSlotContext.Provider>

          <div
            ref={setFooterEl}
            className="border-t bg-popover p-4 pb-[max(1rem,env(safe-area-inset-bottom))] empty:hidden"
          />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex max-h-[90vh] flex-col sm:max-w-106.25"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
          {description && (
            <DialogDescription className="sr-only">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <FooterSlotContext.Provider value={footerEl}>
          <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        </FooterSlotContext.Provider>

        <div
          ref={setFooterEl}
          className="-mx-4 -mb-4 rounded-b-xl border-t bg-popover p-4 empty:hidden"
        />
      </DialogContent>
    </Dialog>
  );
}
