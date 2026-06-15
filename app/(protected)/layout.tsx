import { PropsWithChildren } from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";

const ProtectedLayout = async ({ children }: PropsWithChildren) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(ROUTES.SIGN_IN);
  }
  return <>{children}</>;
};

export default ProtectedLayout;
