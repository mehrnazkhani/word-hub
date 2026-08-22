import { CardContent } from "@/components/ui/card";
import { FeatureShowcaseContainer } from "./FeatureShowcaseContainer";
import { PRACTICE_MODES } from "@/constants/practice-modes";

export const PracticeList = () => {
  return (
    <FeatureShowcaseContainer
      title="Practice & Master Your Words"
      description="Reinforce your vocabulary through six different exercise types — match, guess, fill in the blank, write, synonym, and antonym — so every word truly sticks."
      position="right"
      children={
        <CardContent className="px-5 py-2">
          <div className="grid grid-cols-3 gap-5">
            {PRACTICE_MODES.map((practice) => {
              const Icon = practice.icon;
              return (
                <div
                  key={practice.practiceMode}
                  className="flex items-center gap-2"
                >
                  <div className="flex size-9 items-center justify-center rounded-lg bg-card">
                    <Icon className="size-4 text-accent-foreground/60" />
                  </div>
                  <span className="text-xs text-accent-foreground/60">
                    {practice.label.split(" ")[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      }
    />
  );
};
