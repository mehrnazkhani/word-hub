import { PropsWithChildren } from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/features/header/AppHeader";
import { AppSidebar } from "@/features/sidebar/AppSidebar";
import { AppMainContent } from "@/features/main-content/AppMainContent";
import { getCategories } from "@/lib/data/getCategories";
import { QueryProviders } from "@/components/providers/query-provider";

const SidebarLayout = async ({ children }: PropsWithChildren) => {
  const categories = await getCategories();

  return (
    <QueryProviders>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <AppMainContent>{children}</AppMainContent>
        </SidebarInset>
      </SidebarProvider>
    </QueryProviders>
  );
};

export default SidebarLayout;
