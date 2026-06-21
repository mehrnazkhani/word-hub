import { PropsWithChildren } from "react";
import { TriggerPartOfSpeech } from "./TriggerPartOfSpeech";

export const TriggerIconContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center justify-end gap-2">
      <TriggerPartOfSpeech />
      {children}
    </div>
  );
};
