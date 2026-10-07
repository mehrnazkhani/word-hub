"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SquareIcon, ArrowUp } from "lucide-react";

type AiFillButtonProps = {
  isLoading: boolean;
  isProcessing?: boolean;
  isCompleted?: boolean;
  onFill: () => void;
  onStop: () => void;
  className?: string;
  disabled?: boolean;
};

export const AiFillButton = ({
  isLoading,
  isProcessing = false,
  isCompleted = false,
  onFill,
  onStop,
  className,
  disabled = false,
}: AiFillButtonProps) => {
  const showStop = isLoading || isProcessing;

  return (
    <Button
      type="button"
      variant="default"
      size="lg"
      onClick={showStop ? onStop : onFill}
      disabled={isCompleted ? true : disabled && !showStop}
      className={cn("cursor-pointer", className)}
    >
      {showStop ? (
        <>
          <SquareIcon />
          Stop
        </>
      ) : (
        "Use AI"
      )}
    </Button>
  );
};
