"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { ChevronRight, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconBadge } from "@/components/ui/icon-badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/components/UserAvatar";
import { ThemeToggleRow } from "@/features/settings/theme/ThemeToggleRow";

import { settingsNav } from "@/constants/settings-nav";
import type { UserAccountProps } from "./UserAccount";
import { SignOutConfirm } from "./signout/SignOutConfirm";

type UserAccountDrawerProps = UserAccountProps & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function UserAccountDrawer({
  open,
  onOpenChange,
  fullName,
}: UserAccountDrawerProps) {
  const [signOutOpen, setSignOutOpen] = useState(false);

  const handleSignOutClick = () => {
    onOpenChange(false);
    setSignOutOpen(true);
  };
  return (
    <>
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="h-5/6">
          <DrawerHeader className="flex items-center gap-3">
            <DrawerTitle className="sr-only">Settings</DrawerTitle>
            <DrawerDescription className="sr-only">
              Customize your settings here.
            </DrawerDescription>
            <UserAvatar size="2xl" />
            {fullName ?? "My Account"}
          </DrawerHeader>

          <div className="flex flex-col gap-4 overflow-y-auto px-5 py-1">
            <SettingsContainer className="py-0">
              {settingsNav.map((item, index) => (
                <div key={item.name}>
                  {index > 0 && (
                    <div className="px-3">
                      <Separator />
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    className="flex h-auto w-full items-center justify-between py-3"
                  >
                    <div className="flex items-center gap-3">
                      <IconBadge
                        icon={item.icon}
                        badgeSize={10}
                        variant="secondary"
                      />
                      <div className="flex flex-col text-start">
                        <span>{item.name}</span>
                        <span className="text-xs text-foreground/35">
                          {item.description}
                        </span>
                      </div>
                    </div>

                    <ChevronRight className="size-4 text-muted-foreground" />
                  </Button>
                </div>
              ))}
            </SettingsContainer>

            <SettingsContainer>
              <ThemeToggleRow />
            </SettingsContainer>

            <SettingsContainer className="bg-destructive/10">
              <Button
                variant="ghost"
                className="h-auto w-full justify-start gap-3 text-destructive"
                onClick={handleSignOutClick}
              >
                <IconBadge icon={LogOut} badgeSize={10} variant="destructive" />
                Sign out
              </Button>
            </SettingsContainer>
          </div>
        </DrawerContent>
      </Drawer>

      <SignOutConfirm open={signOutOpen} onOpenChange={setSignOutOpen} />
    </>
  );
}

type SettingsContainerProps = {
  className?: string;
  children: React.ReactNode;
};

const SettingsContainer = ({ className, children }: SettingsContainerProps) => {
  return (
    <Card className={cn("bg-accent/20 py-2", className)}>
      <CardContent className="px-2">{children}</CardContent>
    </Card>
  );
};
