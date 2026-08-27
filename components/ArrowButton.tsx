import { forwardRef } from "react";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

interface ArrowButtonProps extends React.ComponentPropsWithoutRef<
  typeof Button
> {
  isLoading?: boolean;
  isDirty?: boolean;
  direction?: "left" | "right";
}

export const ArrowButton = forwardRef<HTMLButtonElement, ArrowButtonProps>(
  (
    {
      isLoading = false,
      isDirty = false,
      direction = "right",
      disabled,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const ChevronIcon = direction === "left" ? ChevronLeft : ChevronRight;

    return (
      <Button
        ref={ref}
        type={props.type ?? "button"}
        variant={isDirty ? "outline" : "ghost"}
        disabled={disabled || isLoading}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {direction === "left" &&
          (isLoading ? (
            <Spinner data-icon="inline-start" />
          ) : (
            <ChevronIcon className="size-3" />
          ))}

        {children}

        {direction === "right" &&
          (isLoading ? (
            <Spinner data-icon="inline-start" />
          ) : (
            <ChevronIcon className="size-3" />
          ))}
      </Button>
    );
  },
);
