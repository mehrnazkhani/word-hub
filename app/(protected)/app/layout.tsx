import { PropsWithChildren } from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AppHeader } from "@/features/header/AppHeader";
import { AppSidebar } from "@/features/sidebar/AppSidebar";
import { AppMainContent } from "@/features/main-content/AppMainContent";

const SidebarLayout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <AppMainContent>{children}</AppMainContent>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SidebarLayout;
