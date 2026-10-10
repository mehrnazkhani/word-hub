import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type FeatureShowcaseContainerProps = {
  index?: string;
  title: string;
  description: string;
  position?: "left" | "right";
  children: React.ReactNode;
};

export const FeatureShowcaseContainer = ({
  index = "01",
  title,
  description,
  position = "left",
  children,
}: FeatureShowcaseContainerProps) => {
  return (
    <article className="flex w-full gap-6 px-1 max-md:flex-col md:items-start md:gap-10 lg:gap-15">
      <div
        className={cn(
          "w-full min-w-0 space-y-2 max-md:order-1 max-md:text-center md:basis-1/2 lg:basis-2/3",
          position === "left" ? "md:order-2" : "md:order-1",
        )}
      >
        <p className="font-mono text-xs tracking-widest text-accent-foreground/35 uppercase">
          {index}
        </p>
        <h3 className="text-xl font-black">{title}</h3>
        <p className="text-accent-foreground/60">{description}</p>
      </div>

      <Card
        className={cn(
          "h-36 w-full shrink-0 bg-background max-md:order-2 md:basis-1/2 lg:basis-1/3",
          position === "left" ? "md:order-1" : "md:order-2",
        )}
        aria-hidden="true"
      >
        <div className="flex h-full items-center justify-center">
          {children}
        </div>
      </Card>
    </article>
  );
};
