import { AppIcons } from "@/components/icons";
import { ROUTES } from "@/constants/routes";
import type { SidebarHeaderItemType } from "./types";

export const SIDEBAR_HEADER_ITEMS = [
  {
    title: "Practice",
    icon: AppIcons.PracticeIcon,
    href: "/practice",
  },
  {
    title: "Feeds",
    icon: AppIcons.FeedIcon,
    href: "/recent",
  },
  {
    title: "Recently Added",
    icon: AppIcons.ClockIcon,
    href: ROUTES.RECENT,
  },
] as const satisfies readonly SidebarHeaderItemType[];
