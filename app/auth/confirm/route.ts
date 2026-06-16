import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ROUTES } from "@/constants/routes";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const origin = request.nextUrl.origin;

  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const next = searchParams.get("next") || ROUTES.HOME;

  const supabase = await createClient();

  // === Password Reset (Recovery) ===
  if (token_hash && type === "recovery") {
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: "recovery" as const,
    });

    if (error) {
      console.error("Recovery confirm error:", error);
      return NextResponse.redirect(
        new URL(`/error?message=${encodeURIComponent(error.message)}`, origin),
      );
    }

    return NextResponse.redirect(new URL(ROUTES.RESET_PASSWORD, origin));
  }

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(new URL(next, origin));
    }

    console.error("Code exchange error:", error);
  }

  return NextResponse.redirect(new URL("/error", origin));
}
