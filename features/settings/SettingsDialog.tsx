"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { Bell, Home, Menu, MessageCircle, Paintbrush } from "lucide-react";
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

const ProfileSettings = dynamic(() => import("./ProfileSettings"), {
  ssr: false,
});
const AddWordFormSettings = dynamic(() => import("./AddWordFormSettings"), {
  ssr: false,
});
const CategorySettings = dynamic(() => import("./CategorySettings"), {
  ssr: false,
});
const PracticeSettings = dynamic(() => import("./PracticeSettings"), {
  ssr: false,
});
const PrivacySettings = dynamic(() => import("./PrivacySettings"), {
  ssr: false,
});

const settingsSections = {
  Profile: ProfileSettings,
  "Word Form": AddWordFormSettings,
  Practice: PracticeSettings,
  Category: CategorySettings,
  Privacy: PrivacySettings,
} as const;

type SettingsSection = keyof typeof settingsSections;

const data: {
  nav: {
    name: SettingsSection;
    icon: typeof Bell;
  }[];
} = {
  nav: [
    { name: "Profile", icon: Bell },
    { name: "Word Form", icon: Menu },
    { name: "Practice", icon: Home },
    { name: "Category", icon: Paintbrush },
    { name: "Privacy", icon: MessageCircle },
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
      <DialogContent className="overflow-hidden p-0 md:max-h-100 md:max-w-175 lg:max-w-150">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Customize your settings here.
        </DialogDescription>

        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="hidden w-40 md:flex">
            <SidebarContent>
              <SidebarGroup>
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

          <main className="flex h-120 flex-1 flex-col overflow-hidden">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">{activeSection}</BreadcrumbLink>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>

            <div className="flex flex-col items-center justify-center gap-4 overflow-y-auto p-4 pt-0">
              <div className="mb-3 w-full rounded-xl bg-muted/50 p-3">
                <ActiveSettingsComponent />
              </div>
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
