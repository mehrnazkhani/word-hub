import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type IconBadgeVariant = "default" | "secondary" | "destructive";

export interface IconBadgeProps {
  icon: LucideIcon;
  variant?: IconBadgeVariant;
  size?: number;
  className?: string;
}

export function IconBadge({
  icon: Icon,
  variant = "default",
  size = 12,
  className,
}: IconBadgeProps) {
  return (
    <div
      className={cn(
        "flex size-6 items-center justify-center rounded-full",
        {
          "border bg-accent": variant === "default",
          "bg-secondary": variant === "secondary",
          "bg-destructive/10 ring-1 ring-destructive/20":
            variant === "destructive",
        },
        className,
      )}
    >
      <Icon
        size={size}
        className={cn({
          "text-destructive": variant === "destructive",
        })}
      />
    </div>
  );
}
