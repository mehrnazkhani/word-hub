import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

import { TriggerIconContainer } from "./TriggerIconContainer";
import { TriggerChevronDown } from "./TriggerChevronDown";
import { TriggerProgress } from "./TriggerProgress";

type TriggerRightItemsRootProps = PropsWithChildren<{
  className?: string;
}>;

type TriggerRightItemsRootComponent = React.FC<TriggerRightItemsRootProps> & {
  IconContainer: typeof TriggerIconContainer;
  ChevronDown: typeof TriggerChevronDown;
  Progress: typeof TriggerProgress;
};

const TriggerRightItemsRoot = ({
  children,
  className,
}: TriggerRightItemsRootProps) => {
  return (
    <div className={cn("col-span-1 grid gap-3", className)}>{children}</div>
  );
};

export const TriggerRightItems = Object.assign(TriggerRightItemsRoot, {
  IconContainer: TriggerIconContainer,
  ChevronDown: TriggerChevronDown,
  Progress: TriggerProgress,
}) as TriggerRightItemsRootComponent;
