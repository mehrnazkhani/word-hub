import { getAuthenticatedUser } from "@/lib/supabase/getAuthenticatedUser";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();
  const limit = Math.min(Number(searchParams.get("limit") ?? "10"), 50);

  if (!query || query.length < 1) {
    return NextResponse.json({ results: [] });
  }

  const supabase = await createClient();

  const tsQuery = query
    .split(/\s+/)
    .filter(Boolean)
    .map((term) => `${term}:*`)
    .join(" & ");

  const { data, error } = await supabase
    .from("words")
    .select("*")
    .eq("user_id", user.id)
    .filter("search_vector", "fts", tsQuery)
    .order("word", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("[search] Supabase error:", error);
    return NextResponse.json(
      { error: "Search failed. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ results: data ?? [] });
}
