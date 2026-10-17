"use client";

import * as React from "react";
import { LoadingButton } from "@/components/LoadingButton";

interface TryDemoButtonProps extends React.ComponentPropsWithoutRef<
  typeof LoadingButton
> {
  isLoading?: boolean;
}

export const TryDemoButton = ({
  className,
  isLoading = false,
  ...props
}: TryDemoButtonProps) => {
  return (
    <LoadingButton
      type="button"
      variant="outline"
      size="lg"
      isLoading={isLoading}
      className={className}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? "Just a moment…" : "Try Demo"}
    </LoadingButton>
  );
};
