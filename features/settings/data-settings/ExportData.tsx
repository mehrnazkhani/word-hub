import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SettingRow } from "../SettingRow";

export const ExportData = () => {
  return (
    <SettingRow
      icon={{ icon: Download }}
      title="Export Data"
      description="Download all your categories, words as a JSON file."
    >
      <Button variant="outline" className="cursor-pointer">
        <Download /> Export Data
      </Button>
    </SettingRow>
  );
};
