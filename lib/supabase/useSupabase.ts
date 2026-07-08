"use client";

import { useMemo } from "react";
import { createClient } from "./client";

let browserClient: ReturnType<typeof createClient> | undefined;

function getSupabaseBrowserClient() {
  if (browserClient) return browserClient;

  browserClient = createClient();
  return browserClient;
}

export function useSupabase() {
  return useMemo(getSupabaseBrowserClient, []);
}
