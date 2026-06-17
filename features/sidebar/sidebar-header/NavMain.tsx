"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { SIDEBAR_HEADER_ITEMS } from "./sidebarHeaderItems";
import { ImportTrigger } from "@/features/import-export/import/ImportTrigger";

export const NavMain = () => {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {SIDEBAR_HEADER_ITEMS &&
        SIDEBAR_HEADER_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={isActive}>
                <Link href={item.href} scroll={false} replace>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}

      <ImportTrigger />
    </SidebarMenu>
  );
};
