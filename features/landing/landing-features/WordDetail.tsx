import { CardContent } from "@/components/ui/card";
import { FeatureShowcaseContainer } from "./FeatureShowcaseContainer";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, Percent, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WordDetail = () => {
  return (
    <FeatureShowcaseContainer
      index="01 / word"
      title="Save Words in Full Detail"
      description="Store every word with its translation, description, synonyms, antonyms, examples, and more — everything you need to truly learn it, all in one place."
      position="right"
    >
      <CardContent className="space-y-5 px-5 py-2" aria-hidden="true">
        {/* Header */}
        <div className="flex items-stretch justify-between">
          <div className="flex flex-col justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="h-3 w-24 rounded-full bg-accent-foreground/50" />
              <Button
                variant="ghost"
                size="icon-sm"
                className="cursor-pointer"
                tabIndex={-1}
              >
                <Volume2 className="size-4" aria-hidden="true" />
              </Button>
            </div>
            <div className="h-2 w-36 rounded-md bg-accent-foreground/30" />
          </div>

          <div className="flex flex-col items-end justify-between gap-3">
            <ChevronDown className="size-4" aria-hidden="true" />
            <div className="flex w-32 items-center gap-2">
              <Progress value={40} className="flex-1" />
              <Percent className="size-3" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3">
          <div className="h-2 w-full rounded-full bg-accent-foreground/20" />
          <div className="h-2 w-4/5 rounded-full bg-accent-foreground/20" />
        </div>
      </CardContent>
    </FeatureShowcaseContainer>
  );
};
