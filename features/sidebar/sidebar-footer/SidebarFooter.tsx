import Link from "next/link";
import { Trash } from "lucide-react";
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
              <Trash /> Trash
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </Footer>
  );
};
