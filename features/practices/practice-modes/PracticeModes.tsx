"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { IconBadge } from "@/components/ui/icon-badge";

import { PracticeCategoryDialog } from "./PracticeCategoryDialog";
import { ROUTES } from "@/constants/routes";
import { PRACTICE_MODES, type PracticeMode } from "@/constants/practice-modes";
import type { CategoryId } from "./PracticeCategoryList";
import { toast } from "sonner";

export function PracticeModes() {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState<PracticeMode | null>(null);

  const handleCardClick = (mode: PracticeMode) => {
    if (mode.disabled) {
      toast.info("This mode is not available yet");
      return;
    }
    setSelectedMode(mode);
    setDialogOpen(true);
  };

  const handleContinue = (categoryId: CategoryId) => {
    if (!selectedMode) return;
    setDialogOpen(false);
    router.push(ROUTES.PRACTICE_Mode(selectedMode.practiceMode, categoryId));
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
              className="hovertext-accent-foreground cursor-pointer border-0 bg-background hover:bg-accent"
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
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onContinue={handleContinue}
      />
    </section>
  );
}
