"use client";

import { cn } from "@/lib/utils";
import { Link2Off } from "lucide-react";
import { SettingRow } from "../../SettingRow";
import { LoadingButton } from "@/components/LoadingButton";

import { useDisconnectTelegramMutation } from "./useDisconnectTelegramMutation";
import { useTelegramLinkStatus } from "../useTelegramLinkStatus";

export const DisconnectTelegram = () => {
  const { data, isPending: isStatusPending } = useTelegramLinkStatus();
  const { mutate: disconnectTelegramMutation, isPending: isDisconnecting } =
    useDisconnectTelegramMutation();

  const isConnected = data?.isConnected;
  const isDisabled = isStatusPending || !isConnected;

  return (
    <SettingRow
      icon={{
        icon: Link2Off,
        variant: "destructive",
      }}
      title="Disconnect Telegram"
      description="Remove your Telegram account connection and stop receiving bot notifications."
    >
      <LoadingButton
        type="button"
        variant="destructive"
        disabled={isDisabled}
        isLoading={isDisconnecting}
        onClick={() => disconnectTelegramMutation()}
      >
        {isDisconnecting ? (
          "Disconnecting..."
        ) : (
          <>
            <Link2Off />
            Disconnect Telegram
          </>
        )}
      </LoadingButton>
    </SettingRow>
  );
};
