import { AccordionContent } from "@/components/ui/accordion";
import { useWordAccordion } from "../WordAccordionContext";

export const WordAccordionContent = () => {
  const { word } = useWordAccordion();

  const wordDetails = [
    { label: "synonyms", value: word.synonyms },
    { label: "antonyms", value: word.antonyms },
    { label: "description", value: word.description },
  ];

  return (
    <AccordionContent className="mx-2.5 space-y-2 border-l pl-4 text-sm">
      {wordDetails.map(
        (item) =>
          item.value && (
            <div key={item.label} className="flex items-center gap-1">
              <span className="text-xs text-app-tertiary">{item.label}:</span>
              <p className="text-app-secondary">{item.value}</p>
            </div>
          ),
      )}
    </AccordionContent>
  );
};
