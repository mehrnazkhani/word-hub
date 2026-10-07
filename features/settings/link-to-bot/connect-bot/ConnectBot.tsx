"use client";

import { Link } from "lucide-react";
import { SettingRow } from "../../SettingRow";
import { LoadingButton } from "@/components/LoadingButton";
import { useConnectBotMutation } from "./useConnectBotMutation";
import { useBotLinkStatus } from "../useBotLinkStatus";

export const ConnectBot = () => {
  const { data, isPending: isStatusPending } = useBotLinkStatus();
  const { mutate: connectBotMutation, isPending: isConnecting } =
    useConnectBotMutation();

  const isConnected = data?.isConnected;
  const isDisabled = isStatusPending || isConnected;

  return (
    <SettingRow
      icon={{
        icon: Link,
      }}
      title="Connect to Bot"
      description="Link your Bot account with Word Keeper bot to start receiving notifications and manage users."
    >
      <LoadingButton
        type="button"
        variant="outline"
        disabled={isDisabled}
        isLoading={isConnecting}
        onClick={() => connectBotMutation()}
      >
        {isConnecting ? "Connecting..." : <>Link To Bot</>}
      </LoadingButton>
    </SettingRow>
  );
};
