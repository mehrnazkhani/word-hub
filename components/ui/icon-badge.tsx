import { cn } from "@/lib/utils";
import type { ComponentType, SVGProps } from "react";

type IconBadgeVariant = "default" | "secondary" | "destructive";

export interface IconBadgeProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  variant?: IconBadgeVariant;
  badgeSize?: number;
  iconSize?: number;
  className?: string;
}

export function IconBadge({
  icon: Icon,
  variant = "default",
  badgeSize = 6,
  iconSize,
  className,
}: IconBadgeProps) {
  const finalSize = iconSize ?? badgeSize * 2;

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-md",
        {
          "border bg-accent": variant === "default",
          "bg-secondary": variant === "secondary",
          "bg-destructive/10 ring-1 ring-destructive/20":
            variant === "destructive",
        },
        className,
      )}
      style={{
        width: `${badgeSize * 0.25}rem`,
        height: `${badgeSize * 0.25}rem`,
      }}
    >
      <Icon
        width={finalSize}
        height={finalSize}
        style={{ width: finalSize, height: finalSize }}
        className={cn({
          "text-destructive": variant === "destructive",
        })}
      />
    </div>
  );
}
