import { useWordAccordion } from "../../WordAccordionContext";
import { WordPronunciation } from "@/components/WordPronunciation";

export const TriggerWordTitle = () => {
  const { word } = useWordAccordion();

  return (
    <>
      <div className="flex items-center gap-1.5">
        <span className="text-sm">{word.sourceLanguage?.flag}</span>
        <span className="text-sm text-foreground/80">{word.word}</span>

        <WordPronunciation word={word.word} lang={word.sourceLanguage?.value} />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm">{word.targetLanguage?.flag}</span>
        <span className="text-sm text-foreground/60">{word.translation}</span>
      </div>
    </>
  );
};
