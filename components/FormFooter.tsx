"use client";

import { createPortal } from "react-dom";
import { useFooterSlot } from "./FormFooterSlot";

export function FormFooter({ children }: { children: React.ReactNode }) {
  const slot = useFooterSlot();
  if (!slot) return null;
  return createPortal(children, slot);
}
