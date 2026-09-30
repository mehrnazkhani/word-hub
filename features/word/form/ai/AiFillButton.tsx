"use client";

import { Button } from "@/components/ui/button";
import { IconBadge } from "@/components/ui/icon-badge";
import { cn } from "@/lib/utils";
import { SquareIcon, ArrowUp } from "lucide-react";

type AiFillButtonProps = {
  isLoading: boolean;
  onFill: () => void;
  onStop: () => void;
  className?: string;
  disabled?: boolean;
};

export const AiFillButton = ({
  isLoading,
  onFill,
  onStop,
  className,
  disabled = false,
}: AiFillButtonProps) => {
  return (
    <Button
      type="button"
      variant="default"
      onClick={isLoading ? onStop : onFill}
      disabled={disabled && !isLoading}
      className={cn("cursor-pointer text-xs", className)}
    >
      {isLoading ? (
        <>
          <IconBadge icon={SquareIcon} variant="secondary" badgeSize={5} />
          Stop
        </>
      ) : (
        "Use AI"
      )}
    </Button>
  );
};
