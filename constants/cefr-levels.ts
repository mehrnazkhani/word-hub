import type { CefrLevel } from "@/types/db-aliases";

export const CEFR_LEVELS: { value: CefrLevel; label: string }[] = [
  { value: "A1", label: "A1 — Beginner" },
  { value: "A2", label: "A2 — Elementary" },
  { value: "B1", label: "B1 — Intermediate" },
  { value: "B2", label: "B2 — Upper Intermediate" },
  { value: "C1", label: "C1 — Advanced" },
  { value: "C2", label: "C2 — Proficient" },
];

export const CEFR_VALUES = CEFR_LEVELS.map((l) => l.value) as [
  CefrLevel,
  ...CefrLevel[],
];

export const getCefrLevelByValue = (value: CefrLevel | null | undefined) =>
  CEFR_LEVELS.find((l) => l.value === value);
