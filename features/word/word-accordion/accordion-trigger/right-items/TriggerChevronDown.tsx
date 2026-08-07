import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

type TriggerArrowProps = {
  size?: number;
  className?: string;
};

export const TriggerChevronDown = ({
  size = 15,
  className,
}: TriggerArrowProps) => {
  return (
    <ChevronDown
      size={size}
      className={cn(
        "transition-transform duration-300 group-data-[state=open]:rotate-180",
        className,
      )}
    />
  );
};
