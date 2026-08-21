import { Card } from "@/components/ui/card";

export const Hero = () => {
  return (
    <div className="space-y-10">
      <div className="space-y-5 text-center">
        <h1 className="text-5xl font-bold">Expand your vocabulary.</h1>
        <h2 className="text-2xl font-semibold text-accent-foreground/70">
          Smarter, faster.
        </h2>
        <p className="text-accent-foreground/60">
          Add a word and let AI fill in everything — definition, examples,
          synonyms, and translation.
        </p>
      </div>

      <Card className="h-40"></Card>
    </div>
  );
};
