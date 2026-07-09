import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useWordAccordion } from "../../WordAccordionContext";
import type { PartOfSpeech } from "@/types/db-aliases";

const badgeVariants: Record<NonNullable<PartOfSpeech>, string> = {
  noun: "bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30",
  verb: "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30",
  adjective: "bg-violet-500/20 text-violet-400 hover:bg-violet-500/30",
  adverb: "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30",
  pronoun: "bg-pink-500/20 text-pink-400 hover:bg-pink-500/30",
  preposition: "bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30",
  conjunction: "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30",
  interjection: "bg-rose-500/20 text-rose-400 hover:bg-rose-500/30",
};

export const TriggerPartOfSpeechBadge = () => {
  const { word } = useWordAccordion();
  const wordsPartOfSpeech = word.part_of_speech;

  return (
    <>
      {wordsPartOfSpeech && (
        <Badge
          variant="outline"
          className={cn(
            "border-0 capitalize",
            badgeVariants[wordsPartOfSpeech],
          )}
        >
          {wordsPartOfSpeech}
        </Badge>
      )}
    </>
  );
};
