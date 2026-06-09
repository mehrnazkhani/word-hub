import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type InputWrapperProps = PropsWithChildren<{
  className?: string;
}>;

export const InputWrapper = ({ className, children }: InputWrapperProps) => {
  return (
    <div
      className={cn(
        "flex items-center border-b transition-colors duration-300 focus-within:border-app-primary",
        className,
      )}
    >
      {children}
    </div>
  );
};
