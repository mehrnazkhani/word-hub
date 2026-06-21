import { createClient } from "../supabase/server";

export const getCategories = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name")
    .order("created_at", { ascending: false });

  console.log("fetching categories");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data;
};
