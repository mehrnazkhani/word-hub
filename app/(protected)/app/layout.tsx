import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/features/header/AppHeader";
import { AppSidebar } from "@/features/sidebar/AppSidebar";
import { AppMainContent } from "@/features/main-content/AppMainContent";
import { ImportProvider } from "@/features/sidebar/sidebar-header/import/ImportProvider";

const SidebarLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <ImportProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <AppMainContent>{children}</AppMainContent>
        </SidebarInset>
      </ImportProvider>
    </SidebarProvider>
  );
};

export default SidebarLayout;
