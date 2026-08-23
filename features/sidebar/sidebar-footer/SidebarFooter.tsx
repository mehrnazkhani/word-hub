"use client";

import Link from "next/link";

import { Trash } from "lucide-react";
import {
  SidebarFooter as Footer,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ROUTES } from "@/constants/routes";
import { useCloseSidebarOnClick } from "@/hooks/useCloseSidebarOnClick";

export const SidebarFooter = () => {
  const closeSidebar = useCloseSidebarOnClick();

  return (
    <Footer>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="cursor-pointer">
            <Link href={ROUTES.TRASH} onClick={closeSidebar}>
              <Trash /> Trash
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </Footer>
  );
};
