import { Separator } from "@/components/ui/separator";
import { ConnectTelegram } from "./connect-telegram/ConnectTelegram";
import { DisconnectTelegram } from "./disconnect-telegram/DisconnectTelegram";
import { ConnectionStatus } from "./connection-status/ConnectionStatus";

const LinkToTelegramBotSettings = () => {
  return (
    <div className="space-y-5">
      <ConnectTelegram />
      <Separator />
      <ConnectionStatus />
      <Separator />
      <DisconnectTelegram />
    </div>
  );
};

export default LinkToTelegramBotSettings;
