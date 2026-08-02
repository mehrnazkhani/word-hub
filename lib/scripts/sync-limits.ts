import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import { createAdminClient } from "../supabase/admin";
import {
  APP_LIMITS,
  APP_LIMITS_META,
  AppLimitsSchema,
} from "../../constants/app-limits";

const syncLimits = async () => {
  AppLimitsSchema.parse(APP_LIMITS);

  const rows = (Object.keys(APP_LIMITS) as Array<keyof typeof APP_LIMITS>).map(
    (key) => ({
      key,
      value: String(APP_LIMITS[key]),
      value_type: APP_LIMITS_META[key].value_type,
      description: APP_LIMITS_META[key].description,
      updated_at: new Date().toISOString(),
    }),
  );

  const supabase = createAdminClient();

  const { error } = await supabase
    .from("app_limits")
    .upsert(rows, { onConflict: "key" });

  if (error) throw error;
  console.log("app_limits synced:", rows);
};

syncLimits();
