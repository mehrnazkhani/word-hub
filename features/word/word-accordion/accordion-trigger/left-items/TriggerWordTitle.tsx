import { AppIcons } from "@/components/icons";

import { useWordAccordion } from "../../WordAccordionContext";

export const TriggerWordTitle = () => {
  const { word } = useWordAccordion();

  return (
    <>
      <div className="flex items-center gap-1.5">
        <span className="text-sm">{word.source_flag}</span>
        <span className="text-sm text-app-primary">{word.word}</span>

        {word.translation_audio && (
          <AppIcons.AudioIcon size={15} className="cursor-pointer" />
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm">{word.target_flag}</span>
        <span className="text-sm text-app-secondary">{word.translation}</span>
      </div>
    </>
  );
};
