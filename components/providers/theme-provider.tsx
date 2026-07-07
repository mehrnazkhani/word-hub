"use client";

import * as React from "react";
import { ThemeProvider as WrkszThemeProvider } from "@wrksz/themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof WrkszThemeProvider>) {
  return (
    <WrkszThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="theme"
      {...props}
    >
      {children}
    </WrkszThemeProvider>
  );
}
