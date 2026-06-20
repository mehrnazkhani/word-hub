"use client";

import {
  Check,
  LogOut,
  Monitor,
  Moon,
  Palette,
  Settings,
  Sun,
} from "lucide-react";

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

import type { UserAccountProps } from "./UserAccount";
import { SignOutConfirm } from "./signout/SignOutConfirm";

export const UserAccountDropdown = ({ fullName }: UserAccountProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenuContent align="end">
      <DropdownMenuLabel className="truncate text-center">
        {fullName ?? "My Account"}
      </DropdownMenuLabel>

      <DropdownMenuSeparator />

      <DropdownMenuItem className="cursor-pointer text-xs">
        <Settings className="mr-2 size-4" />
        Settings
      </DropdownMenuItem>

      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="cursor-pointer text-xs">
          <Palette className="mr-2 size-4" />
          Theme
        </DropdownMenuSubTrigger>

        <DropdownMenuSubContent>
          <DropdownMenuItem
            className="cursor-pointer text-xs"
            onClick={() => setTheme("light")}
          >
            <Sun className="mr-2 size-4" />
            Light
            {theme === "light" && <Check className="ml-auto size-4" />}
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer text-xs"
            onClick={() => setTheme("dark")}
          >
            <Moon className="mr-2 size-4" />
            Dark
            {theme === "dark" && <Check className="ml-auto size-4" />}
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer text-xs"
            onClick={() => setTheme("system")}
          >
            <Monitor className="mr-2 size-4" />
            System
            {theme === "system" && <Check className="ml-auto size-4" />}
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>

      <DropdownMenuSeparator />

      <SignOutConfirm>
        <DropdownMenuItem
          variant="destructive"
          onSelect={(e) => {
            e.preventDefault();
          }}
          className="cursor-pointer text-xs"
        >
          <LogOut className="mr-2 size-4" />
          Sign out
        </DropdownMenuItem>
      </SignOutConfirm>
    </DropdownMenuContent>
  );
};
