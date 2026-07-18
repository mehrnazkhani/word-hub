import { AccordionContent } from "@/components/ui/accordion";
import { useWordAccordion } from "../WordAccordionContext";

export const WordAccordionContent = () => {
  const { word } = useWordAccordion();

  const wordDetails = [
    { label: "synonyms", value: word.synonyms },
    { label: "antonyms", value: word.antonyms },
    { label: "example", value: word.example },
    { label: "description", value: word.description },
  ].filter(({ value }) =>
    Array.isArray(value) ? value.length > 0 : Boolean(value),
  );

  return (
    <AccordionContent className="overflow-hidden">
      <div className="mx-2.5 space-y-2 border-l py-1.5 pl-4 text-sm">
        {wordDetails.map((item) => (
          <div key={item.label} className="flex items-start gap-1">
            <span className="text-xs text-foreground/50">{item.label}:</span>
            <p className="text-foreground/60">
              {Array.isArray(item.value) ? item.value.join(", ") : item.value}
            </p>
          </div>
        ))}
      </div>
    </AccordionContent>
  );
};
