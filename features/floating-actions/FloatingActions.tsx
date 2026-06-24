"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { FolderPlus, Plus, Type } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { FloatingActionsDialog } from "./FloatingActionsDialog";

type ActiveModal = "add-word" | "create-category" | null;

export const FloatingActions = () => {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <div className="fixed right-10 bottom-10 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              className="size-14 cursor-pointer rounded-full outline-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
              aria-label="Open actions menu"
            >
              <Plus />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" side="top" className="w-44">
            <DropdownMenuItem onClick={() => setActiveModal("add-word")}>
              <Type />
              Add word
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setActiveModal("create-category")}>
              <FolderPlus />
              Create category
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <FloatingActionsDialog activeModal={activeModal} onClose={closeModal} />
    </>
  );
};
