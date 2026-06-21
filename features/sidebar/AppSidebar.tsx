import * as React from "react";
import { Sidebar } from "@/components/ui/sidebar";

import { SidebarHeader } from "./sidebar-header/SidebarHeader";
import { SidebarContent } from "./sidebar-content/SidebarContent";
import { SidebarFooter } from "./sidebar-footer/SidebarFooter";

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar {...props}>
      <SidebarHeader />
      <SidebarContent />
      <SidebarFooter />
    </Sidebar>
  );
};
