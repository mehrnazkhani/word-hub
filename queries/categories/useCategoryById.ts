import { useQuery } from "@tanstack/react-query";

import { useSupabase } from "@/lib/supabase/useSupabase";
import { useUser } from "@/components/providers/user-provider";

import { categoryByIdQueryOptions } from "./categoryQueryOptions";

export const useCategoryById = (id: number | string | null | undefined) => {
  const supabase = useSupabase();
  const { user } = useUser();

  const { data: category, isPending } = useQuery({
    ...categoryByIdQueryOptions({
      supabase,
      userId: user!.id,
      categoryId: Number(id),
    }),
    enabled: !!user,
  });

  return { category: category ?? null, isPending };
};
