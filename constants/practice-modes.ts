import {
  Grid2X2,
  HelpCircle,
  Pencil,
  ArrowUpDown,
  ArrowLeftRight,
  TextCursorInput,
  type LucideIcon,
} from "lucide-react";

export type PracticeModeName =
  "match" | "guess" | "fill" | "write" | "synonym" | "antonym";

export type PracticeMode = {
  label: string;
  desc: string;
  icon: LucideIcon;
  practiceMode: PracticeModeName;
};

export const PRACTICE_MODES: PracticeMode[] = [
  {
    label: "Match Words",
    desc: "Match words with their translations",
    icon: Grid2X2,
    practiceMode: "match",
  },
  {
    label: "Guess Meaning",
    desc: "Choose the correct meaning",
    icon: HelpCircle,
    practiceMode: "guess",
  },
  {
    label: "Fill in the Blank",
    desc: "Complete the missing word",
    icon: TextCursorInput,
    practiceMode: "fill",
  },
  {
    label: "Writing",
    desc: "Type the translation from memory",
    icon: Pencil,
    practiceMode: "write",
  },
  {
    label: "Synonyms",
    desc: "Practice similar words",
    icon: ArrowUpDown,
    practiceMode: "synonym",
  },
  {
    label: "Antonyms",
    desc: "Practice opposite words",
    icon: ArrowLeftRight,
    practiceMode: "antonym",
  },
];
