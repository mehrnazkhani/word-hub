"use client";

import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/components/providers/user-provider";
import { useSupabase } from "@/lib/supabase/useSupabase";
import { userSettingsOptions } from "./userSettingsOptions";

export const useUserSettings = () => {
  const supabase = useSupabase();
  const { user } = useUser();

  return useQuery(userSettingsOptions(supabase, user!.id));
};
