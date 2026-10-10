"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroWordCard } from "./HeroWordCard";
import { ROUTES } from "@/constants/routes";

export const HeroSection = () => {
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
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="flex flex-col items-center justify-center gap-y-10"
    >
      <div className="space-y-10 text-center">
        <h1
          id="hero-heading"
          className="text-2xl font-bold md:text-4xl lg:text-6xl"
        >
          Your Vocabulary,
          <br className="sm:hidden" /> All in One Place
        </h1>

        <p className="mx-auto max-w-2xl text-accent-foreground/60 md:text-lg">
          Save translations, examples, and synonyms for every word you learn.
          Organize by category, track your progress, and practice until it truly
          sticks.
        </p>
      </div>

      <HeroWordCard />

      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
        <Button size="lg" className="cursor-pointer" asChild>
          <Link href={ROUTES.SIGN_IN}>Get Started</Link>
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="cursor-pointer"
          onClick={scrollToFeatures}
          aria-label="Scroll to features section"
        >
          See how it works
          <ArrowRight aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
};
