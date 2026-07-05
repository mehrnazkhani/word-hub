import { createClient } from "@/lib/supabase/client";

const selectFields = "id, name";

export const getCategories = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("categories")
    .select(selectFields)
    .order("created_at", { ascending: false });

  console.log("fetching categories");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data;
};
