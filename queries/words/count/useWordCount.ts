"use client";

import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "@/lib/supabase/useSupabase";
import { useUser } from "@/components/providers/user-provider";
import { wordCountQuery } from "./wordCountQuery";

export const useWordCount = () => {
  const supabase = useSupabase();
  const { user } = useUser();

  return useQuery(wordCountQuery(supabase, user!.id));
};
