"use client";

import { Button } from "@/components/ui/button";
import { SquareIcon, ArrowUp } from "lucide-react";

type AiFillButtonProps = {
  isLoading: boolean;
  onFill: () => void;
  onStop: () => void;
};

export const AiFillButton = ({
  isLoading,
  onFill,
  onStop,
}: AiFillButtonProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={isLoading ? onStop : onFill}
      className="cursor-pointer text-xs"
    >
      {isLoading ? (
        <>
          <SquareIcon className="size-4" />
          Stop
        </>
      ) : (
        <>
          <ArrowUp className="size-4" />
          Fill with AI
        </>
      )}
    </Button>
  );
};
