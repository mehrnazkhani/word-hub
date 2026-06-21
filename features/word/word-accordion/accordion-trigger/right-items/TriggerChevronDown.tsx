import { cn } from "@/lib/utils";
import { AppIcons } from "@/components/icons";

type TriggerArrowProps = {
  size?: number;
  className?: string;
};

export const TriggerChevronDown = ({
  size = 15,
  className,
}: TriggerArrowProps) => {
  return (
    <AppIcons.ChevronDownIcon
      size={size}
      className={cn(
        "transition-transform duration-300 group-data-[state=open]:rotate-180",
        className,
      )}
    />
  );
};
