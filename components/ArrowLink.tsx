import Link from "next/link";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ArrowLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  direction?: "left" | "right";
}

export const ArrowLink = ({
  direction = "right",
  className,
  children,
  ...props
}: ArrowLinkProps) => {
  const ChevronIcon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <Link
      className={cn(
        "flex w-fit items-center gap-1 text-xs transition-colors duration-300 hover:text-accent-foreground/70",
        className,
      )}
      {...props}
    >
      {direction === "left" && <ChevronIcon className="size-3" />}
      {children}
      {direction === "right" && <ChevronIcon className="size-3" />}
    </Link>
  );
};
