import { PropsWithChildren } from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AppHeader } from "@/features/header/AppHeader";
import { AppSidebar } from "@/features/sidebar/AppSidebar";
import { AppMainContent } from "@/features/main-content/AppMainContent";
import { CategoriesStoreInitializer } from "@/features/category/CategoriesStoreInitializer";
import { getCategories } from "@/lib/data/getCategories";

const SidebarLayout = async ({ children }: PropsWithChildren) => {
  const categories = await getCategories();

  return (
    <SidebarProvider>
      <CategoriesStoreInitializer categories={categories} />

      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <AppMainContent>{children}</AppMainContent>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SidebarLayout;
