import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import { LandingFeatures } from "@/features/landing/LandingFeatures";
import { LandingHeader } from "@/features/landing/LandingHeader";
import { Hero } from "@/features/landing/Hero";
import { ROUTES } from "@/constants/routes";
import { LandingPracticeShowcase } from "@/features/landing/LandingPracticeShowcase";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(ROUTES.APP);
  }

  return (
    <div className="mx-auto flex h-screen w-full flex-col items-center bg-background px-5">
      <LandingHeader />

      <div
        id="landing-scroll"
        className="scrollbar-hide relative w-full max-w-6xl flex-1 scroll-fade space-y-50 overflow-y-auto scroll-smooth pt-20"
      >
        <Hero />

        <LandingFeatures />

        <LandingPracticeShowcase />
      </div>
    </div>
  );
}
