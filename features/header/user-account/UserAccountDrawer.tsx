"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { IconBadge } from "@/components/ui/icon-badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";

import { UserAvatar } from "@/components/UserAvatar";
import { ThemeToggleRow } from "@/features/settings/theme/ThemeToggleRow";

import ProfileSettings from "@/features/settings/profile/ProfileSettings";
import WordFormSettings from "@/features/settings/word-form/WordFormSettings";
import DailyWordSettings from "@/features/settings/daily-word/DailyWordSettings";
import PrivacySettings from "@/features/settings/privacy/PrivacySettings";
import DataManagementSettings from "@/features/settings/data/DataManagementSettings";
import AIFillSettingsForm from "@/features/settings/ai-fill/AIFillSettings";

import { settingsNav } from "@/constants/settings-nav";

import type { UserAccountProps } from "./UserAccount";
import { SignOutConfirm } from "./signout/SignOutConfirm";

type UserAccountDrawerProps = UserAccountProps & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type SettingsView = "root" | (typeof settingsNav)[number]["name"];

const settingsViews = {
  Profile: <ProfileSettings />,
  "Word Form": <WordFormSettings />,
  "Daily Word": <DailyWordSettings />,
  Privacy: <PrivacySettings />,
  Data: <DataManagementSettings />,
  "AI Fill": <AIFillSettingsForm />,
} satisfies Record<Exclude<SettingsView, "root">, React.ReactNode>;

export function UserAccountDrawer({
  open,
  onOpenChange,
  fullName,
}: UserAccountDrawerProps) {
  const [signOutOpen, setSignOutOpen] = useState(false);
  const [view, setView] = useState<SettingsView>("root");

  const handleSignOutClick = () => {
    onOpenChange(false);
    setSignOutOpen(true);
  };

  const handleDrawerChange = (open: boolean) => {
    onOpenChange(open);

    if (!open) {
      setView("root");
    }
  };

  return (
    <>
      <Drawer
        open={open}
        onOpenChange={handleDrawerChange}
        disablePointerDismissal={view !== "root"}
      >
        <DrawerContent className="flex h-2/3 max-h-2/3 flex-col">
          {view === "root" ? (
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
              <DrawerHeader className="flex items-center gap-3">
                <DrawerTitle className="sr-only">Settings</DrawerTitle>

                <DrawerDescription className="sr-only">
                  Customize your settings here.
                </DrawerDescription>

                <UserAvatar size="2xl" />

                {fullName ?? "My Account"}
              </DrawerHeader>

              <div className="flex flex-col gap-4 px-5 py-1">
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
                        onClick={() => setView(item.name)}
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

                <SettingsContainer className="border-none! bg-destructive/10">
                  <Button
                    variant="ghost"
                    className="h-auto w-full justify-start gap-3 text-destructive"
                    onClick={handleSignOutClick}
                  >
                    <IconBadge
                      icon={LogOut}
                      badgeSize={10}
                      variant="destructive"
                    />
                    Sign out
                  </Button>
                </SettingsContainer>
              </div>

              <DrawerFooter>
                <p className="text-center text-xs text-muted-foreground">
                  WordHub v1.0.0
                </p>
              </DrawerFooter>
            </div>
          ) : (
            <div className="flex flex-1 flex-col overflow-y-auto">
              <DrawerHeader>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setView("root")}
                  >
                    <ChevronLeft className="size-5" />
                  </Button>

                  <DrawerTitle>{view}</DrawerTitle>
                </div>
              </DrawerHeader>

              <div className="flex-1 p-7">{settingsViews[view]}</div>
            </div>
          )}
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
    <Card className={cn("shrink-0 bg-accent/20 py-2", className)}>
      <CardContent className="px-2">{children}</CardContent>
    </Card>
  );
};
