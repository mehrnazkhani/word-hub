import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { createClient } from "@/lib/supabase/server";
import { ModeToggle } from "@/features/header/mode-toggle/ModeToggle";
import { ROUTES } from "@/constants/routes";

const AuthLayout = async ({ children }: Readonly<PropsWithChildren>) => {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();

  if (data?.claims?.sub) {
    redirect(ROUTES.HOME);
  }

  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <ModeToggle />
      </div>

      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-md border p-10">
          <div className="space-y-5">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
