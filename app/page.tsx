import { createClient } from "@/lib/supabase/server";

import { redirect } from "next/navigation";
import { FeatureShowcase } from "@/features/landing/tools/ FeatureShowcase";
import { LandingHeader } from "@/features/landing/LandingHeader";
import { Hero } from "@/features/landing/Hero";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/app");
  }

  return (
    <div className="mx-auto flex h-screen w-full flex-col items-center bg-background px-5">
      <LandingHeader />
      <div className="scrollbar-hide relative w-full max-w-4xl flex-1 space-y-30 overflow-y-auto pt-30">
        <Hero />
        <FeatureShowcase />
      </div>
    </div>
  );
}
