"use client";

import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "@/lib/supabase/useSupabase";
import { languagesQuery } from "./languagesQuery";

export const useLanguages = () => {
  const supabase = useSupabase();
  return useQuery(languagesQuery(supabase));
};
