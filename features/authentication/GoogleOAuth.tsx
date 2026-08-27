"use client";

import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/icons/google-icon";
import { createClient } from "@/lib/supabase/client";

export const GoogleOAuth = () => {
  const supabase = createClient();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/confirm`,
      },
    });
  };

  return (
    <Button
      onClick={handleSignIn}
      variant="outline"
      size="lg"
      className="w-full cursor-pointer"
    >
      <GoogleIcon />
      Continue With Google
    </Button>
  );
};
