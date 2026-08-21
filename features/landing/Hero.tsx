import { HeroWordCard } from "./HeroWordCard";

export const Hero = () => {
  return (
    <div className="space-y-20">
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
    </div>
  );
};
