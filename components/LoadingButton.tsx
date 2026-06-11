import * as React from "react";

import { cn } from "@/lib/utils";
import { Spinner } from "./ui/spinner";
import { Button, buttonVariants } from "@/components/ui/button";

import type { VariantProps } from "class-variance-authority";

interface LoadingButtonProps
  extends
    React.ComponentPropsWithoutRef<typeof Button>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  className?: string;
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ isLoading = false, className, children, ...props }, ref) => {
    return (
      <Button
        type="submit"
        ref={ref}
        {...props}
        className={cn("cursor-pointer", className)}
        disabled={isLoading}
      >
        {isLoading && <Spinner data-icon="inline-start" />}
        {children}
      </Button>
    );
  },
);

export { LoadingButton };
