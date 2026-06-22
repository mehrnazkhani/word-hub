import Link from "next/link";

import { AppIcons } from "@/components/icons";
import {
  SidebarFooter as Footer,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { ROUTES } from "@/constants/routes";

export const SidebarFooter = () => {
  return (
    <Footer>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="cursor-pointer">
            <Link href={ROUTES.TRASH}>
              <AppIcons.TrashIcon /> Trash
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </Footer>
  );
};
