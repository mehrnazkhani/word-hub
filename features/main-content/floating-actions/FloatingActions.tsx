"use client";

import { useState } from "react";
import { Plus, ListPlus, FolderPlus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FloatingActionsContent } from "./FloatingActionsContent";
import { IconBadge } from "@/components/ui/icon-badge";

type ActiveModal = "add-word" | "create-category" | null;

export const FloatingActions = () => {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-0 z-40 bg-black/10 supports-backdrop-filter:backdrop-blur-xs transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="fixed right-5 bottom-14 z-50 md:right-10 md:bottom-10">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="default"
              className="size-14 cursor-pointer rounded-full outline-none hover:bg-primary focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none aria-expanded:bg-primary data-[state=open]:bg-primary"
              aria-label="Open actions menu"
            >
              <Plus
                className="size-[1.3em] transition-transform duration-300 ease-in-out"
                style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
              />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            side="top"
            sideOffset={12}
            className="w-44 p-2 ring-1 ring-white/10"
          >
            <DropdownMenuItem onSelect={() => setActiveModal("add-word")}>
              <IconBadge icon={ListPlus} /> Add word
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onSelect={() => setActiveModal("create-category")}
            >
              <IconBadge icon={FolderPlus} /> Create category
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <FloatingActionsContent activeModal={activeModal} onClose={closeModal} />
    </>
  );
};
