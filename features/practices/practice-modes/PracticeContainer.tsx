import { cn } from "@/lib/utils";

import { PracticeProgressbar } from "./PracticeProgressbar";

type PracticeContainerProps = {
  current: number;
  total: number;
  header?: React.ReactNode;
  className?: string;
  showProgress?: boolean;
  children: React.ReactNode;
};

export const PracticeContainer = ({
  current,
  total,
  header,
  className,
  showProgress = true,
  children,
}: PracticeContainerProps) => (
  <div
    className={cn("mx-auto flex w-full min-h-dvh max-w-4xl flex-col px-5", className)}
  >
    {(showProgress || header) && (
      <header
        className={cn(
          "py-[clamp(24px,6vh,64px)]",
          header && "flex flex-col gap-2",
        )}
      >
        {showProgress && (
          <PracticeProgressbar current={current} total={total} />
        )}
        {header}
      </header>
    )}

    {children}
  </div>
);
