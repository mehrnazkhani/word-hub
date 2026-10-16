"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useSupabase } from "@/lib/supabase/useSupabase";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";

const DEMO_ERROR_MESSAGE = "Couldn't start the demo. Please try again.";
const DEMO_USER_NAME = "Demo User";

export const TryDemoButton = ({
  className,
  children = "Try Demo",
  ...props
}: React.ComponentProps<typeof Button>) => {
  const supabase = useSupabase();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        const { data, error: signInError } =
          await supabase.auth.signInAnonymously({
            options: { data: { full_name: DEMO_USER_NAME } },
          });

        if (signInError) throw signInError;
        if (!data.user) throw new Error("Anonymous sign-in returned no user.");
      }

      const { error: seedError } = await supabase.rpc("seed_demo_data");

      if (seedError) throw seedError;

      router.push(ROUTES.HOME);
    } catch (error) {
      console.error("[TryDemoButton] Failed to start demo:", error);
      toast.error(DEMO_ERROR_MESSAGE, { id: "try-demo" });
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="lg"
      className={cn("cursor-pointer", className)}
      onClick={handleClick}
      disabled={isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading && <Spinner data-icon="inline-start" />}
      {isLoading ? "Preparing demo..." : children}
    </Button>
  );
};
