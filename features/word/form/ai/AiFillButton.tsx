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
};

export const AiFillButton = ({
  isLoading,
  onFill,
  onStop,
  className,
}: AiFillButtonProps) => {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={isLoading ? onStop : onFill}
      className={cn("cursor-pointer text-xs", className)}
    >
      {isLoading ? (
        <>
          <IconBadge icon={SquareIcon} variant="secondary" badgeSize={7} />
          Stop
        </>
      ) : (
        <>
          <IconBadge icon={ArrowUp} variant="secondary" badgeSize={7} />
          Auto Fill
        </>
      )}
    </Button>
  );
};
