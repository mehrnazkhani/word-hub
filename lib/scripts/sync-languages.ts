import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { LANGUAGES, LanguageSchema } from "@/constants/languages";

const syncLanguages = async () => {
  z.array(LanguageSchema).parse(LANGUAGES);

  const ids = LANGUAGES.map((l) => l.id);
  const uniqueIds = new Set(ids);
  if (ids.length !== uniqueIds.size) throw new Error("Duplicate language IDs");

  const supabase = createAdminClient();

  const { error } = await supabase
    .from("languages")
    .upsert(LANGUAGES, { onConflict: "id" });

  if (error) throw error;

  console.log(`✅ languages synced: ${LANGUAGES.length} rows`);
};

syncLanguages().catch((err) => {
  console.error("❌ sync failed:", err);
  process.exit(1);
});
