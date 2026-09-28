"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import {
  Bell,
  CircleUserRound,
  Database,
  Form,
  Shield,
  PencilSparkles,
  CalendarClock,
  Link,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

const ProfileSettings = dynamic(() => import("./profile/ProfileSettings"), {
  ssr: false,
});
const WordFormSettings = dynamic(() => import("./word-form/WordFormSettings"), {
  ssr: false,
});
const DailyWordSuggestionSettings = dynamic(
  () => import("./daily-word/DailyWordSettings"),
  {
    ssr: false,
  },
);
const PrivacySettings = dynamic(() => import("./privacy/PrivacySettings"), {
  ssr: false,
});
const DataManagementSettings = dynamic(
  () => import("./data/DataManagementSettings"),
  {
    ssr: false,
  },
);
const AIFillSettingsForm = dynamic(() => import("./ai-fill/AIFillSettings"), {
  ssr: false,
});
const LinkToTelegramBotSettings = dynamic(
  () => import("./link-to-telegram-bot/LinkToTelegramBotSettings"),
  {
    ssr: false,
  },
);

const settingsSections = {
  Profile: ProfileSettings,
  "Word form": WordFormSettings,
  "Daily word": DailyWordSuggestionSettings,
  Privacy: PrivacySettings,
  Data: DataManagementSettings,
  "Ai fill": AIFillSettingsForm,
  "Link to bot": LinkToTelegramBotSettings,
} as const;

type SettingsSection = keyof typeof settingsSections;

const data: {
  nav: {
    name: SettingsSection;
    icon: typeof Bell;
  }[];
} = {
  nav: [
    { name: "Profile", icon: CircleUserRound },
    { name: "Word form", icon: Form },
    { name: "Daily word", icon: CalendarClock },
    { name: "Privacy", icon: Shield },
    { name: "Data", icon: Database },
    { name: "Ai fill", icon: PencilSparkles },
    { name: "Link to bot", icon: Link },
  ],
};

type SettingsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("Profile");

  const ActiveSettingsComponent = settingsSections[activeSection];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onPointerDownOutside={(event) => event.preventDefault()}
        onEscapeKeyDown={(event) => event.preventDefault()}
        className="max-h-110 overflow-hidden p-0 md:max-w-2xl"
      >
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Customize your settings here.
        </DialogDescription>

        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="hidden w-40 md:flex">
            <SidebarContent className="h-full">
              <SidebarGroup className="h-full">
                <SidebarGroupContent>
                  <SidebarMenu>
                    {data.nav.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          asChild
                          isActive={activeSection === item.name}
                          onClick={() => setActiveSection(item.name)}
                        >
                          <a href="#">
                            <item.icon />
                            <span>{item.name}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          <main className="flex h-106 flex-1 flex-col overflow-hidden">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        {activeSection} settings
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>

            <div className="mx-3 flex h-full flex-col gap-4 overflow-y-auto rounded-xl bg-muted/50 p-4">
              <ActiveSettingsComponent />
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
