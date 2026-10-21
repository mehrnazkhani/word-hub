"use client";

import { useEffect, useEffectEvent } from "react";

type SearchShortcutProps = {
  shortcutKey: string;
  onToggle: () => void;
};

export function useSearchShortcut({
  shortcutKey,
  onToggle,
}: SearchShortcutProps) {
  const onToggleEvent = useEffectEvent(onToggle);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === shortcutKey) {
        e.preventDefault();
        onToggleEvent();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [shortcutKey]);
}
