import { useWordAccordion } from "../WordAccordionContext";
import { MoveRight } from "lucide-react";

export const FooterLanguages = () => {
  const { word } = useWordAccordion();

  return (
    <div className="flex items-center gap-1">
      <span>{word.sourceLanguage?.flag}</span>
      <span className="text-foreground/50">{word.sourceLanguage?.label}</span>

      <MoveRight size={12} className="text-foreground/50" />

      <span className="text-foreground/50">{word.targetLanguage?.label}</span>
      <span>{word.targetLanguage?.flag}</span>
    </div>
  );
};
