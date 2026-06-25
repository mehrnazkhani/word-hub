import { createClient } from "../supabase/server";

export const getCategoryById = async (categoryId: number) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id")
    .eq("id", categoryId);

  if (error) {
    console.error("Error fetching category:", error);
    return null;
  }

  return data;
};
