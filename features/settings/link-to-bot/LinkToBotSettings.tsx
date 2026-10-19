"use client";

import { Separator } from "@/components/ui/separator";
import { useUser } from "@/components/providers/user-provider";
import { isDemoUser } from "@/lib/utils/isDemoUser";
import { AccountRequired } from "./account-required/AccountRequired";
import { ConnectBot } from "./connect-bot/ConnectBot";
import { DisconnectBot } from "./disconnect-bot/DisconnectBot";
import { ConnectionStatus } from "./connection-status/ConnectionStatus";

const LinkToBotSettings = () => {
  const { user } = useUser();

  if (isDemoUser(user)) {
    return <AccountRequired />;
  }

  return (
    <div className="space-y-5">
      <ConnectBot />
      <Separator />
      <ConnectionStatus />
      <Separator />
      <DisconnectBot />
    </div>
  );
};

export default LinkToBotSettings;
