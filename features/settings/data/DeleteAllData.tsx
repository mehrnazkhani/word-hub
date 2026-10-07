import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SettingRow } from "../SettingRow";

export const DeleteAllData = () => {
  return (
    <SettingRow
      icon={{
        icon: Trash,
        variant: "destructive",
      }}
      title="Delete All Data"
      description="Permanently remove all categories, saved words and progress."
    >
      <Button variant="destructive" className="cursor-pointer">
        Delete All Data
      </Button>
    </SettingRow>
  );
};
