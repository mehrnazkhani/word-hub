"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { AuthChangeEvent, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

type UserContextValue = {
  user: User | null;
  isPending: boolean;
};

const UserContext = createContext<UserContextValue>({
  user: null,
  isPending: true,
});

export const UserProvider = ({
  initialUser,
  children,
}: {
  initialUser: User | null;
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(initialUser);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session) => {
      if (event === "INITIAL_SESSION") return;
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, isPending }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  return useContext(UserContext);
}
