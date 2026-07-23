import { forwardRef } from "react";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

interface ArrowButtonProps extends React.ComponentPropsWithoutRef<
  typeof Button
> {
  isLoading?: boolean;
}

const ArrowButton = forwardRef<HTMLButtonElement, ArrowButtonProps>(
  ({ isLoading = false, disabled, className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        type={props.type ?? "button"}
        variant="ghost"
        disabled={disabled || isLoading}
        className={cn("cursor-pointer text-xs", className)}
        {...props}
      >
        {isLoading && <Spinner data-icon="inline-start" />}
        {children}
        {!isLoading && <ChevronRight className="size-3" />}
      </Button>
    );
  },
);

ArrowButton.displayName = "ArrowButton";

export { ArrowButton };
