"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@wrksz/themes/client";

import { Switch } from "@/components/ui/switch";
import { IconBadge } from "@/components/ui/icon-badge";

export function ThemeToggleRow() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex items-center justify-between px-2.5">
      <div className="flex items-center gap-3">
        <IconBadge
          icon={isDark ? Moon : Sun}
          badgeSize={10}
          variant="secondary"
        />

        <span className="text-sm">Dark Mode</span>
      </div>

      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
    </div>
  );
}
