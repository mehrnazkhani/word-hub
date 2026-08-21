import { Card } from "@/components/ui/card";

type ToolsContainerProps = {
  title: string;
  description: string;
  position?: "left" | "right";
  children: React.ReactNode;
};

export const FeatureShowcaseContainer = ({
  title,
  description,
  position = "left",
  children,
}: ToolsContainerProps) => {
  const content = (
    <div className="flex-1 space-y-2 max-md:text-center">
      <h1 className="text-xl font-black">{title}</h1>
      <p className="text-accent-foreground/60">{description}</p>
    </div>
  );

  const wrappedChildren = (
    <Card className="h-36 w-96 flex-1 bg-background">{children}</Card>
  );

  return (
    <div className="flex w-full justify-between px-1 max-md:flex-col max-md:items-center max-md:gap-4 md:gap-30">
      {position === "left" && wrappedChildren}
      {content}
      {position === "right" && wrappedChildren}
    </div>
  );
};
