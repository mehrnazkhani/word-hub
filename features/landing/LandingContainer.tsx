import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

type ContainerProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
};

export const LandingContainer = ({
  className,
  asChild = false,
  ...props
}: ContainerProps) => {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      data-slot="container"
      className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}
      {...props}
    />
  );
};
