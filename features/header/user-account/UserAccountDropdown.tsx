"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { useTheme } from "@wrksz/themes/client";
import {
  Check,
  LogOut,
  Monitor,
  Moon,
  Palette,
  Settings,
  Sun,
  User,
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

import { SignOutConfirm } from "./signout/SignOutConfirm";
import type { UserAccountProps } from "./UserAccount";

const SettingsDialog = dynamic(() => import("../../settings/SettingsDialog"), {
  ssr: false,
});

export const UserAccountDropdown = ({ fullName }: UserAccountProps) => {
  const { theme, setTheme } = useTheme();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <DropdownMenuContent align="end" className="max-w-56 p-2">
        <DropdownMenuLabel className="flex items-center">
          <User className="mr-1.5 size-3 shrink-0" />
          <span className="min-w-0 flex-1 truncate">
            {fullName ?? "My Account"}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={() => setSettingsOpen(true)}
        >
          <Settings className="size-3" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="cursor-pointer">
            <Palette className="size-3" />
            Theme
          </DropdownMenuSubTrigger>

          <DropdownMenuSubContent className="p-2">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setTheme("light")}
            >
              <Sun className="size-3" />
              Light
              {theme === "light" && <Check className="ml-auto size-3" />}
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setTheme("dark")}
            >
              <Moon className="size-3" />
              Dark
              {theme === "dark" && <Check className="ml-auto size-3" />}
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setTheme("system")}
            >
              <Monitor className="size-3" />
              System
              {theme === "system" && <Check className="ml-auto size-3" />}
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
            className="cursor-pointer"
          >
            <LogOut className="size-3" />
            Sign out
          </DropdownMenuItem>
        </SignOutConfirm>
      </DropdownMenuContent>

      {settingsOpen && (
        <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
      )}
    </>
  );
};
