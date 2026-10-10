"use client";

import Link from "next/link";
import { useState } from "react";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { ROUTES } from "@/constants/routes";

const ITEM_WIDTHS = ["w-full", "w-1/3", "w-2/3"] as const;

export const FullWidthSection = () => {
  return (
    <section
      aria-labelledby="full-width-heading"
      className="bg-foreground/3 px-5 py-12 sm:px-8 lg:py-16"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:grid lg:min-h-80 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center lg:gap-16">
        <div className="flex flex-col items-center space-y-5 sm:items-start">
          <h2
            id="full-width-heading"
            className="text-center text-2xl font-bold sm:text-left sm:text-3xl"
          >
            Practice in Different Ways
          </h2>

          <p className="mx-auto max-w-2xl text-center leading-7 text-balance text-accent-foreground/60 sm:mx-0 sm:max-w-none sm:text-left">
            Reinforce your vocabulary through six different exercise types —
            match, guess, fill in the blank, write, synonym, and antonym — so
            every word truly sticks.
          </p>

          <div
            className="flex flex-wrap items-center justify-center gap-3 sm:justify-start sm:gap-5"
            aria-hidden="true"
          >
            {PRACTICE_MODES.map((practice) => {
              const Icon = practice.icon;

              return (
                <div
                  key={practice.label}
                  className="group flex size-11 items-center justify-center rounded-lg border bg-background sm:size-12"
                >
                  <Icon className="size-5 text-accent-foreground/50 transition-colors group-hover:text-accent-foreground/70" />
                </div>
              );
            })}
          </div>

          <Button
            size="lg"
            className="mt-auto hidden w-fit cursor-pointer lg:flex"
            asChild
          >
            <Link href={ROUTES.SIGN_IN}>
              Get Started Now
              <ArrowRight />
            </Link>
          </Button>
        </div>

        <Card className="h-full bg-background" aria-hidden="true">
          <CardContent className="flex h-full items-center justify-center px-[clamp(1rem,5vw,3.75rem)] py-8 lg:py-0">
            <QuestionnaireAnimated />
          </CardContent>
        </Card>

        <Button size="lg" className="w-full cursor-pointer lg:hidden" asChild>
          <Link href={ROUTES.SIGN_IN}>
            Get Started Now
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export function QuestionnaireAnimated() {
  const [selectedOption, setSelectedOption] = useState("option-2");

  return (
    <Questionnaire className="mx-auto w-full max-w-md" defaultItem="task">
      <QuestionnaireProgress />

      <QuestionnaireItem name="task" required className="space-y-8!">
        <QuestionnaireTitle className="h-2 w-3/4 rounded-full bg-foreground/50" />

        <QuestionnaireChoices>
          {ITEM_WIDTHS.map((width, i) => {
            const option = `option-${i + 1}`;

            return (
              <QuestionnaireChoice
                key={option}
                value={option}
                checked={selectedOption === option}
                onChange={() => setSelectedOption(option)}
              >
                <div className="flex min-h-4 items-center">
                  <p
                    className={`h-2 rounded-full bg-accent-foreground/40 ${width}`}
                  />
                </div>
              </QuestionnaireChoice>
            );
          })}
        </QuestionnaireChoices>
      </QuestionnaireItem>
    </Questionnaire>
  );
}
