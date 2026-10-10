import { cn } from "@/lib/utils";

type AiResultCardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export const AiResultCard = ({
  title,
  children,
  className,
}: AiResultCardProps) => (
  <div
    className={cn(
      "animate-in space-y-3 rounded-lg duration-300 fade-in slide-in-from-bottom-2",
      className,
    )}
  >
    <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
      {title}
    </p>
    {children}
  </div>
);
