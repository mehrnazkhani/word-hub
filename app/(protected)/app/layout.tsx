import { PropsWithChildren } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { QueryProviders } from "@/components/providers/query-provider";
import { getLanguages } from "@/queries/languages/getLanguages";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/features/header/AppHeader";
import { AppSidebar } from "@/features/sidebar/AppSidebar";
import { AppMainContent } from "@/features/main-content/AppMainContent";

const SidebarLayout = async ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["languages"],
    queryFn: getLanguages,
  });

  return (
    <QueryProviders>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <AppHeader />
            <AppMainContent>{children}</AppMainContent>
          </SidebarInset>
        </SidebarProvider>
      </HydrationBoundary>
    </QueryProviders>
  );
};

export default SidebarLayout;
