"use client";

import Link from "next/link";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { IconBadge } from "@/components/ui/icon-badge";
import {
  PartyPopper,
  Clock,
  XCircle,
  CircleCheck,
  type LucideIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  correctCount: number;
  incorrectCount: number;
  totalWords: number;
  elapsedSeconds: number;
};

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
};

type StatItemProps = {
  icon: LucideIcon;
  value: string | number;
  label: string;
};

const StatItem = ({ icon: Icon, value, label }: StatItemProps) => (
  <div className="flex flex-1 flex-col items-center gap-3">
    <Icon className="text-accent-foreground/60" />
    <span className="text-2xl font-semibold tabular-nums">{value}</span>
    <span className="text-xs text-accent-foreground/60 uppercase">{label}</span>
  </div>
);

export const PracticeResultDialog = ({
  open,
  onOpenChange,
  correctCount,
  totalWords,
  incorrectCount,
  elapsedSeconds,
}: Props) => (
  <AlertDialog open={open} onOpenChange={onOpenChange}>
    <AlertDialogContent className="space-y-5">
      <AlertDialogHeader className="flex flex-row items-center gap-3">
        <IconBadge icon={PartyPopper} badgeSize={15} />
        <div className="flex flex-col">
          <AlertDialogTitle>Practice Completed</AlertDialogTitle>
          <p className="text-xs text-accent-foreground/60">
            Great job! Keep it up.
          </p>
        </div>
      </AlertDialogHeader>

      <div className="flex items-center justify-between py-2">
        <StatItem icon={CircleCheck} value={correctCount} label="Correct" />
        <Separator orientation="vertical" className="h-12!" />
        <StatItem icon={XCircle} value={incorrectCount} label="Incorrect" />
        <Separator orientation="vertical" className="h-12!" />
        <StatItem
          icon={Clock}
          value={formatTime(elapsedSeconds)}
          label="Time"
        />
      </div>

      <AlertDialogFooter>
        <Button asChild className="w-full cursor-pointer">
          <Link href={ROUTES.PRACTICE}>Done</Link>
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
