import { PartOfSpeechType } from "@/types/db-aliases";

const partOfSpeechColors: Record<string, string> = {
  noun: "bg-cyan-500/20 text-cyan-400",
  verb: "bg-emerald-500/20 text-emerald-400",
  adjective: "bg-violet-500/20 text-violet-400",
  adverb: "bg-amber-500/20 text-amber-400",
  pronoun: "bg-pink-500/20 text-pink-400",
  preposition: "bg-indigo-500/20 text-indigo-400",
  conjunction: "bg-orange-500/20 text-orange-400",
  interjection: "bg-rose-500/20 text-rose-400",
  determiner: "bg-sky-500/20 text-sky-400",
};

export function getPartOfSpeechColor(type: PartOfSpeechType | null): string {
  if (!type) return "";
  return partOfSpeechColors[type] || "";
}
