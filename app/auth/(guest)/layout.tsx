import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { createClient } from "@/lib/supabase/server";
import { isDemoUser } from "@/lib/utils/isDemoUser";
import { ModeToggle } from "@/components/ModeToggle";
import { ROUTES } from "@/constants/routes";

const AuthLayout = async ({ children }: Readonly<PropsWithChildren>) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Guests (the Try Demo flow) still hold their anonymous session while they
  // create an account from inside the app, so they have to be able to reach
  // these pages: the sign-up form and the check-email page they land on after
  // signing up. Only a registered account belongs in the app.
  if (user && !isDemoUser(user)) {
    redirect(ROUTES.HOME);
  }

  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <ModeToggle />
      </div>

      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-md p-10 md:border">
          <div className="space-y-5">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
