"use client";

import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useIsMobile } from "@/hooks/use-mobile";

import { UserAvatar } from "@/components/UserAvatar";
import { UserAccountDropdown } from "./UserAccountDropdown";
import { UserAccountDrawer } from "./UserAccountDrawer";

export type UserAccountProps = {
  fullName?: string | null;
};

export function UserAccount({ fullName }: UserAccountProps) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  if (isMobile) {
    return (
      <>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="cursor-pointer outline-none"
        >
          <UserAvatar />
        </button>

        <UserAccountDrawer
          open={open}
          onOpenChange={setOpen}
          fullName={fullName}
        />
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="cursor-pointer outline-none">
          <UserAvatar />
        </button>
      </DropdownMenuTrigger>

      <UserAccountDropdown fullName={fullName} />
    </DropdownMenu>
  );
}
