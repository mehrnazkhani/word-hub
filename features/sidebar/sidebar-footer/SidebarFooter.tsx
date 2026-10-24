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
import { useCloseMobileSidebar } from "@/hooks/useCloseMobileSidebar";

export const SidebarFooter = () => {
  const closeSidebar = useCloseMobileSidebar();

  return (
    <Footer className="pb-4">
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
