"use client";

import { Link } from "lucide-react";
import { SettingRow } from "../../SettingRow";
import { LoadingButton } from "@/components/LoadingButton";
import { useConnectTelegramMutation } from "./useConnectTelegramMutation";
import { useTelegramLinkStatus } from "../useTelegramLinkStatus";

export const ConnectTelegram = () => {
  const { data, isPending: isStatusPending } = useTelegramLinkStatus();
  const { mutate: connectTelegramMutation, isPending: isConnecting } =
    useConnectTelegramMutation();

  const isConnected = data?.isConnected;
  const isDisabled = isStatusPending || isConnected;

  return (
    <SettingRow
      icon={{
        icon: Link,
      }}
      title="Connect to Telegram"
      description="Link your Telegram account with Word Keeper bot to start receiving notifications and manage users."
    >
      <LoadingButton
        type="button"
        variant="outline"
        disabled={isDisabled}
        isLoading={isConnecting}
        onClick={() => connectTelegramMutation()}
      >
        {isConnecting ? (
          "Connecting..."
        ) : (
          <>
            <Link />
            Link To Telegram
          </>
        )}
      </LoadingButton>
    </SettingRow>
  );
};
