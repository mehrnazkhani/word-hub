"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroWordCard } from "./HeroWordCard";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export const Hero = () => {
  const scrollToFeatures = () => {
    const container = document.getElementById("landing-scroll");
    const features = document.getElementById("features");

    if (!container || !features) return;

    container.scrollTo({
      top: features.offsetTop - 20,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-10">
      <div className="space-y-10 text-center">
        <h1 className="text-2xl font-bold md:text-4xl lg:text-6xl">
          Your Vocabulary, All in One Place
        </h1>

        <p className="mx-auto max-w-2xl text-accent-foreground/60 md:text-lg">
          Save translations, examples, and synonyms for every word you learn.
          Organize by category, track your progress, and practice until it truly
          sticks.
        </p>
      </div>

      <HeroWordCard />

      <div className="flex items-center gap-5">
        <Button className="cursor-pointer" asChild>
          <Link href={ROUTES.SIGN_IN}>Started now</Link>
        </Button>

        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={scrollToFeatures}
        >
          See how it works
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};
