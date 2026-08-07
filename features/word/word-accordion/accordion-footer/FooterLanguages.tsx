import { useWordAccordion } from "../WordAccordionContext";
import { MoveRight } from "lucide-react";

export const FooterLanguages = () => {
  const { word } = useWordAccordion();

  return (
    <p className="flex items-center gap-1 text-foreground/50">
      {word.sourceLanguage?.flag} {word.sourceLanguage?.label}
      <MoveRight size={12} />
      {word.targetLanguage?.label} {word.targetLanguage?.flag}
    </p>
  );
};
