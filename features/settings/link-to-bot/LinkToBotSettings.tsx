import { Separator } from "@/components/ui/separator";
import { ConnectBot } from "./connect-bot/ConnectBot";
import { DisconnectBot } from "./disconnect-bot/DisconnectBot";
import { ConnectionStatus } from "./connection-status/ConnectionStatus";

const LinkToBotSettings = () => {
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
