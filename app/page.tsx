import { createClient } from "@/lib/supabase/server";

import DashboardPage from "./(protected)/app/page";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/app");
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Signin / signup</h1>
    </div>
  );
}
