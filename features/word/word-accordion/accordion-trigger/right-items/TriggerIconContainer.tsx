import { PropsWithChildren } from "react";
import { TriggerPartOfSpeechBadge } from "./TriggerPartOfSpeechBadge";

export const TriggerIconContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center justify-end gap-2">
      <TriggerPartOfSpeechBadge />
      {children}
    </div>
  );
};
