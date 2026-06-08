import {
  SidebarFooter as Footer,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { AppIcons } from "@/components/icons";

export const SidebarFooter = () => {
  return (
    <Footer>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton className="cursor-pointer">
            <AppIcons.TrashIcon /> Trash
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </Footer>
  );
};
