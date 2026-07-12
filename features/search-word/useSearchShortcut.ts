"use client";

import { useEffect } from "react";

type SearchShortcutProps = {
  key: string;
  onToggle: () => void;
};

export function useSearchShortcut({ key, onToggle }: SearchShortcutProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === key) {
        e.preventDefault();
        onToggle();
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [onToggle]);
}
