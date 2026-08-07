import { useWordAccordion } from "../WordAccordionContext";
import { AppIcons } from "@/components/icons";

export const FooterLanguages = () => {
  const { word } = useWordAccordion();

  return (
    <p className="flex items-center gap-1 text-foreground/50">
      {word.sourceLanguage?.flag} {word.sourceLanguage?.label}
      <AppIcons.MoveRightIcon size={12} />
      {word.targetLanguage?.label} {word.targetLanguage?.flag}
    </p>
  );
};
