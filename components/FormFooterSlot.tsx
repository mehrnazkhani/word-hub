"use client";

import * as React from "react";

const FooterSlotContext = React.createContext<HTMLElement | null>(null);

export const useFooterSlot = () => React.useContext(FooterSlotContext);

export const FooterSlotProvider = ({
  value,
  children,
}: {
  value: HTMLElement | null;
  children: React.ReactNode;
}) => (
  <FooterSlotContext.Provider value={value}>
    {children}
  </FooterSlotContext.Provider>
);
