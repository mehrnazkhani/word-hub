import { useWordAccordion } from "../WordAccordionContext";
import { AppIcons } from "@/components/icons";

const FooterLanguages = () => {
  const { word } = useWordAccordion();

  return (
    <p className="flex items-center gap-1">
      {word.source_language}
      <AppIcons.MoveRightIcon size={12} />
      {word.target_language}
    </p>
  );
};

export { FooterLanguages };
