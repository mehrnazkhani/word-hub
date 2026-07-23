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
  disabled?: boolean | undefined;
  className?: string;
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ isLoading = false, disabled, className, children, ...props }, ref) => {
    return (
      <Button
        type={props.type ?? "submit"}
        ref={ref}
        {...props}
        className={cn("cursor-pointer", className)}
        disabled={disabled || isLoading}
      >
        {isLoading && <Spinner data-icon="inline-start" />}
        {children}
      </Button>
    );
  },
);

export { LoadingButton };
