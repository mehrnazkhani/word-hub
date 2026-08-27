"use client";

import { Button } from "@/components/ui/button";
import { IconBadge } from "@/components/ui/icon-badge";
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
      variant="ghost"
      onClick={isLoading ? onStop : onFill}
      className="cursor-pointer text-xs"
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
