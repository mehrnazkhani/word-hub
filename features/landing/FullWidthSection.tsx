"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Questionnaire,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireItem,
  QuestionnaireProgress,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire";
import { PRACTICE_MODES } from "@/constants/practice-modes";
import { Button } from "@/components/ui/button";

export const FullWidthSection = () => {
  return (
    <div className="h-80 bg-accent-foreground/3 px-10 py-5">
      <div className="mx-auto grid h-full max-w-6xl grid-cols-3 gap-6">
        <div className="col-span-2 flex h-full flex-col space-y-5">
          <p className="text-3xl font-bold">Practice in Different Ways</p>

          <p className="w-xl text-accent-foreground/60">
            Reinforce your vocabulary through six different exercise types —
            match, guess, fill in the blank, write, synonym, and antonym — so
            every word truly sticks.
          </p>

          <div className="flex items-center gap-5">
            {PRACTICE_MODES.map((practice) => {
              const Icon = practice.icon;

              return (
                <div
                  key={practice.label}
                  className="group flex size-12 cursor-pointer items-center justify-center rounded-lg border bg-accent-foreground/5"
                >
                  <Icon className="size-5 text-accent-foreground/50 transition-colors group-hover:text-accent-foreground/70" />
                </div>
              );
            })}
          </div>

          <Button className="mt-auto w-fit cursor-pointer">
            Get Started Now
          </Button>
        </div>

        <Card className="h-full w-full bg-transparent">
          <CardContent className="flex h-full items-center justify-center px-[clamp(1rem,5vw,3.75rem)]">
            <QuestionnaireAnimated />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ITEM_WIDTHS = ["w-full", "w-1/3", "w-2/3"] as const;

export function QuestionnaireAnimated() {
  return (
    <Questionnaire className="mx-auto max-w-md" defaultItem="task">
      <QuestionnaireProgress />

      <QuestionnaireItem name="" required className="space-y-8!">
        <QuestionnaireTitle className="h-2 w-3/4 rounded-full bg-accent-foreground/40" />

        <QuestionnaireChoices defaultValue="option-2">
          {ITEM_WIDTHS.map((width, i) => (
            <QuestionnaireChoice key={i} value={`option-${i + 1}`}>
              <div className="flex min-h-4 items-center">
                <p
                  className={`h-2 rounded-full bg-accent-foreground/40 ${width}`}
                />
              </div>
            </QuestionnaireChoice>
          ))}
        </QuestionnaireChoices>
      </QuestionnaireItem>
    </Questionnaire>
  );
}
