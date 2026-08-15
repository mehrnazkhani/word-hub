import { Clock, Gamepad2, type LucideIcon } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export interface SidebarHeaderItemType {
  title: string;
  icon: LucideIcon;
  href: string;
}

export const SIDEBAR_HEADER_ITEMS = [
  {
    title: "Practice",
    icon: Gamepad2,
    href: ROUTES.PRACTICE,
  },
  {
    title: "Recently Added",
    icon: Clock,
    href: ROUTES.RECENT,
  },
] as const satisfies readonly SidebarHeaderItemType[];
