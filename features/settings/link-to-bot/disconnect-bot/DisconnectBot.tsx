"use client";

import { Link2Off } from "lucide-react";
import { SettingRow } from "../../SettingRow";
import { LoadingButton } from "@/components/LoadingButton";

import { useDisconnectBotMutation } from "./useDisconnectBotMutation";
import { useBotLinkStatus } from "../useBotLinkStatus";

export const DisconnectBot = () => {
  const { data, isPending: isStatusPending } = useBotLinkStatus();
  const { mutate: disconnectBotMutation, isPending: isDisconnecting } =
    useDisconnectBotMutation();

  const isConnected = data?.isConnected;
  const isDisabled = isStatusPending || !isConnected;

  return (
    <SettingRow
      icon={{
        icon: Link2Off,
        variant: "destructive",
      }}
      title="Disconnect Bot"
      description="Remove your Bot account connection and stop receiving bot notifications."
    >
      <LoadingButton
        type="button"
        variant="destructive"
        disabled={isDisabled}
        isLoading={isDisconnecting}
        onClick={() => disconnectBotMutation()}
      >
        {isDisconnecting ? (
          "Disconnecting..."
        ) : (
          <>
            <Link2Off />
            Disconnect Bot
          </>
        )}
      </LoadingButton>
    </SettingRow>
  );
};
