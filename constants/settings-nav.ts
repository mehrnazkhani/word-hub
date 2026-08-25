import type { LucideIcon } from "lucide-react";
import {
  CircleUserRound,
  Database,
  Form,
  Shield,
  PencilSparkles,
  CalendarClock,
} from "lucide-react";

export type SettingsSection =
  "Profile" | "Word Form" | "Daily Word" | "Privacy" | "Data" | "AI Fill";

export type SettingsNavItem = {
  name: SettingsSection;
  description: string;
  icon: LucideIcon;
};

export const settingsNav: SettingsNavItem[] = [
  {
    name: "Profile",
    description: "Manage your personal info.",
    icon: CircleUserRound,
  },
  {
    name: "Word Form",
    description: "Customize the word form.",
    icon: Form,
  },
  {
    name: "Daily Word",
    description: "Configure daily words.",
    icon: CalendarClock,
  },
  {
    name: "Privacy",
    description: "Control your privacy and security.",
    icon: Shield,
  },
  {
    name: "Data",
    description: "Import, export, and manage data.",
    icon: Database,
  },
  {
    name: "AI Fill",
    description: "Choose AI-filled fields.",
    icon: PencilSparkles,
  },
];
