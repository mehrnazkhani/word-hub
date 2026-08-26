"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { FloatingActionsContent } from "./FloatingActionsContent";

type ActiveModal = "add-word" | "create-category" | null;

export const FloatingActions = () => {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <div className="fixed right-5 bottom-14 z-50 md:right-10 md:bottom-10">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="size-14 cursor-pointer rounded-full bg-secondary! outline-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
              aria-label="Open actions menu"
            >
              <Plus
                className="size-[1.3em] transition-transform duration-300 ease-in-out"
                style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
              />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" side="top" className="w-40 p-2">
            <DropdownMenuItem onClick={() => setActiveModal("add-word")}>
              Add word
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setActiveModal("create-category")}>
              Create category
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <FloatingActionsContent activeModal={activeModal} onClose={closeModal} />
    </>
  );
};
