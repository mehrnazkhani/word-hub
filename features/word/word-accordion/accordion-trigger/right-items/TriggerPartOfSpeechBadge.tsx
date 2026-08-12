import { PartOfSpeechBadge } from "@/components/PartOfSpeechBadge";
import { useWordAccordion } from "../../WordAccordionContext";

export const TriggerPartOfSpeechBadge = () => {
  const { word } = useWordAccordion();

  return <PartOfSpeechBadge partOfSpeech={word.part_of_speech} />;
};
