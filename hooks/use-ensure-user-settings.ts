// hooks/use-ensure-user-settings.ts
"use client";

import { useEffect, useRef } from "react";
import { useUserSettingsStore } from "@/stores/userSettings.store";
import { getUserSettings } from "@/lib/data/getUserSettings";

export function useEnsureUserSettings() {
  const status = useUserSettingsStore((s) => s.status);
  const setSettings = useUserSettingsStore((s) => s.setSettings);
  const setStatus = useUserSettingsStore((s) => s.setStatus);
  const requestedRef = useRef(false);

  useEffect(() => {
    if (status !== "idle" || requestedRef.current) return;
    requestedRef.current = true;
    setStatus("loading");

    getUserSettings()
      .then((data) => {
        setSettings({
          defaultSourceLangId: data?.default_source_lang_id ?? null,
          defaultTargetLangId: data?.default_target_lang_id ?? null,
          defaultCategoryId: data?.default_category_id ?? null,
        });
      })
      .catch(() => setStatus("error"));
  }, [status, setSettings, setStatus]);

  return status;
}
