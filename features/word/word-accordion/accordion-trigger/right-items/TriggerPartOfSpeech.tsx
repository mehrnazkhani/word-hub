import { getPartOfSpeechColor } from "@/features/word/utils/getPartOfSpeechColor";
import { useWordAccordion } from "../../WordAccordionContext";
import { cn } from "@/lib/utils";

export const TriggerPartOfSpeech = () => {
  const { word } = useWordAccordion();

  return (
    <>
      {word.part_of_speech && (
        <span
          className={cn(
            "rounded-sm px-1.5 py-0.5 text-xs",
            getPartOfSpeechColor(word.part_of_speech),
          )}
        >
          {word.part_of_speech}
        </span>
      )}
    </>
  );
};
