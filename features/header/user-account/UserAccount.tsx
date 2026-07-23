"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { UserAvatar } from "@/components/UserAvatar";
import { UserAccountDropdown } from "./UserAccountDropdown";

export type UserAccountProps = {
  fullName?: string | null;
};

export function UserAccount({ fullName }: UserAccountProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="cursor-pointer outline-none">
          <UserAvatar />
        </button>
      </DropdownMenuTrigger>

      <UserAccountDropdown fullName={fullName} />
    </DropdownMenu>
  );
}
