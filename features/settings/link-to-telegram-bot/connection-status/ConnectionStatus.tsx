"use client";

import { CheckCheck } from "lucide-react";
import { useTelegramLinkStatus } from "../useTelegramLinkStatus";
import { SettingRow } from "../../SettingRow";

export const ConnectionStatus = () => {
  const { data, isPending } = useTelegramLinkStatus();
  const verifiedAt = data?.verifiedAt;

  const description = isPending
    ? "Checking connection status..."
    : verifiedAt
      ? `${new Date(verifiedAt).toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })}`
      : "Not connected yet";
  return (
    <SettingRow
      icon={{
        icon: CheckCheck,
      }}
      title="Verified at:"
      description={description}
    />
  );
};
