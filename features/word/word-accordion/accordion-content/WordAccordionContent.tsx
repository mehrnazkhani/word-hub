import { AccordionContent } from "@/components/ui/accordion";
import { useWordAccordion } from "../WordAccordionContext";

export const WordAccordionContent = () => {
  const { word } = useWordAccordion();

  const tableDetails = [
    { label: "synonyms", value: word.synonyms },
    { label: "antonyms", value: word.antonyms },
  ].filter(({ value }) =>
    Array.isArray(value) ? value.length > 0 : Boolean(value),
  );

  const hasDescription = Boolean(word.description);
  const hasExample = Boolean(word.example);
  const hasTable = tableDetails.length > 0;

  return (
    <AccordionContent className="overflow-hidden">
      <div className="mx-2.5 space-y-2 border-l py-1.5 pl-4 text-sm">
        {hasDescription && (
          <p className="text-xs leading-relaxed text-foreground/60 italic">
            {word.description}
          </p>
        )}

        {hasTable && (
          <div className="flex flex-col divide-y divide-border rounded-md border">
            {tableDetails.map((item) => (
              <div
                key={item.label}
                className="flex items-baseline gap-3 px-3 py-2"
              >
                <span className="w-16 shrink-0 text-xs text-foreground/40">
                  {item.label}
                </span>
                <p className="text-xs text-foreground/70">
                  {Array.isArray(item.value)
                    ? item.value.join(", ")
                    : item.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {hasExample && (
          <div className="flex items-baseline gap-3 rounded-md bg-secondary/40 px-3 py-2">
            <span className="w-16 shrink-0 text-xs text-foreground/40">
              example
            </span>
            <p className="text-xs text-foreground/70 italic">
              "{word.example}"
            </p>
          </div>
        )}
      </div>
    </AccordionContent>
  );
};
