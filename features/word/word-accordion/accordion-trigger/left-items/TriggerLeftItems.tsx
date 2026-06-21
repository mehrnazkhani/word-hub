import { PropsWithChildren } from "react";

export const TriggerLeftItems = ({ children }: PropsWithChildren) => {
  return <div className="col-span-2 space-y-1.5">{children}</div>;
};
