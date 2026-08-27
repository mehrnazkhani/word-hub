import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { HeaderSection } from "@/features/landing/HeaderSection";
import { HeroSection } from "@/features/landing/HeroSection";
import { FeaturesSection } from "@/features/landing/FeaturesSection";
import { FullWidthSection } from "@/features/landing/FullWidthSection";
import { FooterSection } from "@/features/landing/FooterSection";
import { ROUTES } from "@/constants/routes";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(ROUTES.APP);
  }

  return (
    <div className="mx-auto flex h-screen w-full flex-col items-center bg-background">
      <HeaderSection />

      <div
        id="landing-scroll"
        className="scrollbar-hide relative w-full flex-1 scroll-fade space-y-20 overflow-y-auto scroll-smooth pt-20"
      >
        <main className="mx-auto max-w-6xl space-y-50 px-5">
          <HeroSection />
          <FeaturesSection />
        </main>

        <Separator />
        <FullWidthSection />
        <FooterSection />
      </div>
    </div>
  );
}
