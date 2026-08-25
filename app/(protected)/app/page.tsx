"use client";

import { useUser } from "@/components/providers/user-provider";
import { Separator } from "@/components/ui/separator";
import { WordOfTheDay } from "@/features/main-content/app-page/WordOfTheDay";

export default function DashboardPage() {
  const { user } = useUser();

  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col px-4">
      <section className="flex flex-1 flex-col justify-center">
        <header className="space-y-1.5 pb-7">
          <h1 className="text-2xl font-medium tracking-tight">
            Hello, {user?.user_metadata.full_name}
          </h1>
          <p className="text-sm text-secondary-foreground/60">
            Ready to expand your vocabulary today?
          </p>
        </header>

        <Separator />

        <main className="py-10">
          <WordOfTheDay />
        </main>
      </section>

      <Separator />

      <footer className="py-5">
        <p className="text-center text-xs text-secondary-foreground/40">
          Every new word you learn is a new perspective you gain.
        </p>
      </footer>
    </div>
  );
}
