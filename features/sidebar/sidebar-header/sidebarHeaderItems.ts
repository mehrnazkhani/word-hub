import { AppIcons } from "@/components/icons";
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
    href: "/recent",
  },
] as const satisfies readonly SidebarHeaderItemType[];
