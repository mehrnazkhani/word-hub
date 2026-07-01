import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-lg border border-border bg-transparent px-2.5 py-2 text-sm transition-colors duration-300 placeholder:text-muted-foreground",
        "focus:border-ring focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
