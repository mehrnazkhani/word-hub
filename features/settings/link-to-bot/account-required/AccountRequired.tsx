"use client";

import Link from "next/link";
import { AArrowDown } from "lucide-react";
import { SettingRow } from "../../SettingRow";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export const AccountRequired = () => {
  return (
    <SettingRow
      icon={{
        icon: AArrowDown,
      }}
      title="Account required"
      description="You're in demo mode, so there's no account to link. Create one to start receiving notifications."
    >
      <Button
        type="button"
        variant="outline"
        className="cursor-pointer"
        asChild
      >
        <Link href={ROUTES.SIGN_UP}>Create account</Link>
      </Button>
    </SettingRow>
  );
};
