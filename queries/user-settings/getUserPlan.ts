import type { SupabaseClient } from "@supabase/supabase-js";
import type { UserPlan } from "@/constants/ai-config";
import type { Database } from "@/types/supabase";

/**
 * Pure selector: derives the AI plan from an already-fetched settings row.
 * Use this wherever user settings are prefetched/cached (e.g. via
 * `prefetchUserSettings` / `useUserSettings`) to avoid a separate fetch.
 * Defaults to "free" when settings are missing or not yet loaded.
 */
export const getPlanFromSettings = (
  settings: { is_premium?: boolean | null } | null | undefined,
): UserPlan => (settings?.is_premium ? "premium" : "free");

/**
 * Resolves the AI plan for a user based on the manually maintained
 * `user_settings.is_premium` flag.
 *
 * Defaults to "free" when the row is missing, the user is unknown,
 * or the column hasn't been added yet (so the app keeps working
 * before/after the manual DB change).
 */
export const getUserPlan = async (
  supabase: SupabaseClient<Database>,
  userId: string | undefined | null,
): Promise<UserPlan> => {
  if (!userId) return "free";

  try {
    const { data, error } = await supabase
      .from("user_settings")
      .select("is_premium")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.warn("[ai-plan] falling back to free plan:", error.message);
      return "free";
    }

    const plan = getPlanFromSettings(data);
    console.log(
      `[ai-plan] user="${userId}" is_premium=${data?.is_premium ?? false} tier="${plan}"`,
    );
    return plan;
  } catch (err) {
    console.warn("[ai-plan] falling back to free plan:", err);
    return "free";
  }
};
