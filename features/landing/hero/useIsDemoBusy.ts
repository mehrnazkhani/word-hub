import * as React from "react";

/**
 * Starting the demo is a page wide operation: one security check, one sign-in
 * and one redirect. Keeping that state outside of React means every
 * `TryDemoButton` on the page knows about it without needing a provider, so
 * only one instance can run (and open its dialog) at a time.
 */
let isDemoBusy = false;

const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = () => isDemoBusy;

const getServerSnapshot = () => false;

export const setIsDemoBusy = (value: boolean) => {
  if (isDemoBusy === value) return;

  isDemoBusy = value;
  listeners.forEach((listener) => listener());
};

export const useIsDemoBusy = () =>
  React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
