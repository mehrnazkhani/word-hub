"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { IconBadge } from "@/components/ui/icon-badge";

import { PracticeCategoryDialog } from "./PracticeCategoryDialog";
import { ROUTES } from "@/constants/routes";
import { PRACTICE_MODES, type PracticeMode } from "@/constants/practice-modes";
import type { CategoryId } from "./PracticeCategoryList";

export function PracticeModes() {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState<PracticeMode | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleCardClick = (mode: PracticeMode) => {
    if (mode.disabled) {
      toast.info("This mode is not available yet");
      return;
    }
    setIsNavigating(false);
    setSelectedMode(mode);
  };

  const handleContinue = (categoryId: CategoryId) => {
    if (!selectedMode) return;

    // Keep the dialog open while the practice page renders so the user does
    // not see the list page without the dialog. It unmounts with this page
    // once the navigation commits.
    setIsNavigating(true);
    router.push(ROUTES.PRACTICE_Mode(selectedMode.practiceMode, categoryId));
  };

  const handleDialogOpenChange = (open: boolean) => {
    // Closing is blocked until the practice page is ready.
    if (!open && isNavigating) return;
    if (!open) {
      setIsNavigating(false);
      setSelectedMode(null);
    }
  };

  return (
    <section className="space-y-3">
      <h2 className="font-semibold">Practice Modes</h2>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {PRACTICE_MODES.map((mode) => {
          const Icon = mode.icon;
          return (
            <Card
              key={mode.practiceMode}
              className="cursor-pointer border-0 bg-background hover:bg-accent hover:text-accent-foreground"
              onClick={() => handleCardClick(mode)}
            >
              <CardContent className="flex flex-col gap-3">
                <IconBadge icon={Icon} badgeSize={10} />
                <div className="space-y-1">
                  <p className="text-sm font-semibold">{mode.label}</p>
                  <p className="text-xs leading-relaxed text-accent-foreground/60">
                    {mode.desc}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <PracticeCategoryDialog
        open={selectedMode !== null}
        onOpenChange={handleDialogOpenChange}
        onContinue={handleContinue}
        isNavigating={isNavigating}
      />
    </section>
  );
}
