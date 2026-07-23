"use client";

import Link from "next/link";

import { SettingRow } from "../../SettingRow";
import { Mail, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/components/providers/user-provider";
import { ROUTES } from "@/constants/routes";

export const ChangeEmail = () => {
  const { user } = useUser();

  return (
    <SettingRow
      icon={{
        icon: Mail,
      }}
      title="Email Address"
      description={user?.email ?? ""}
    >
      <Button variant="outline" asChild>
        <Link href={ROUTES.CHANGE_EMAIL}>
          <SquarePen className="size-3" /> Change
        </Link>
      </Button>
    </SettingRow>
  );
};
