"use client";

import { ArrowButton } from "@/components/ArrowButton";
import { useUser } from "@/components/providers/user-provider";
import { UserAvatar } from "@/components/UserAvatar";

export const ProfileIdentity = () => {
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <UserAvatar size="lg" />

        <div className="flex flex-col gap-1">
          <span>Display Name</span>
          <span className="text-accent-foreground/60">
            {user?.user_metadata?.full_name ?? user?.user_metadata?.name ?? "—"}
          </span>
        </div>
      </div>

      <ArrowButton>Edit</ArrowButton>
    </div>
  );
};
