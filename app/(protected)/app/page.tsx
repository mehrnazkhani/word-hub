"use client";

import { useUser } from "@/components/providers/user-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { WordPronunciation } from "@/components/WordPronunciation";
import { Bookmark } from "lucide-react";

export default function DashboardPage() {
  const { user } = useUser();

  return (
    <main className="mx-48 flex flex-col gap-15">
      <header className="space-y-2">
        <h1 className="text-3xl">Hello, {user?.user_metadata.full_name}</h1>
        <div className="text-secondary-foreground/60">
          Ready to expand your vocabulary Today?
        </div>
      </header>

      <Separator />

      <main className="flex flex-col gap-5">
        <span className="text-xs text-secondary-foreground/60">
          TODAY'S WORD
        </span>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-4xl">serendipity</span>
            <WordPronunciation word="serendipity" lang="en" />
          </div>
          <Button variant="ghost" className="cursor-pointer">
            <Bookmark /> Save
          </Button>
        </div>

        <div className="flex items-center gap-5">
          <span className="text-secondary-foreground/70 italic">
            /,ser.an'dıp.I.ti/
          </span>
          <Badge variant="secondary">noun</Badge>
        </div>

        <p className="text-secondary-foreground/60">
          The occurrence and development of events by chance in a happy or
          beneficial way.
        </p>

        <div className="mt-5 flex items-center gap-5 text-sm">
          <span>Synonyms</span>
          <p className="text-secondary-foreground/60">
            chance, coincidence, happy accident, fluke
          </p>
        </div>
        <div className="flex items-center gap-5 text-sm">
          <span>Antonyms</span>
          <p className="text-secondary-foreground/60">
            misfortune, calamity, disaster
          </p>
        </div>
        <div className="flex items-center gap-5 text-sm">
          <span>Example</span>
          <p className="text-secondary-foreground/60 italic">
            "A chance meeting with an old friend led to a serendipity that
            changed her career path."
          </p>
        </div>
      </main>

      <Separator />

      <footer>
        <p className="flex items-center justify-center text-xs text-secondary-foreground/60">
          Every new word you learn is a new perspective you gain.
        </p>
      </footer>
    </main>
  );
}
