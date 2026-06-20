"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserAccountDropdown } from "./UserAccountDropdown";

export type UserAccountProps = {
  fullName?: string | null;
};

export function UserAccount({ fullName }: UserAccountProps) {
  const initial = fullName?.trim()?.[0]?.toUpperCase() ?? "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="cursor-pointer outline-none">
          <Avatar>
            <AvatarFallback className="text-lg">{initial}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <UserAccountDropdown fullName={fullName} />
    </DropdownMenu>
  );
}
