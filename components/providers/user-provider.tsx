"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import type { AuthChangeEvent, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

type UserContextValue = {
  user: User | null;
};

const UserContext = createContext<UserContextValue>({
  user: null,
});

export const UserProvider = ({
  initialUser,
  children,
}: {
  initialUser: User | null;
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(initialUser);
  const value = useMemo(() => ({ user }), [user]);

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
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  return useContext(UserContext);
}
