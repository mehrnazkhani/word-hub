import { Separator } from "@/components/ui/separator";
import { SignOutButton } from "@/features/authentication/SignOutButton";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <h1>hi {user.user_metadata.full_name}</h1>
        <SignOutButton />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Signin / signup</h1>
    </div>
  );
}
