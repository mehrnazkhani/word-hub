import { Download } from "lucide-react";
import { SettingRow } from "../SettingRow";
import { ArrowButton } from "@/components/ArrowButton";

export const ExportData = () => {
  return (
    <SettingRow
      icon={{ icon: Download }}
      title="Export Data"
      description="Download all your categories, words as a JSON file."
    >
      <ArrowButton>Export Data</ArrowButton>
    </SettingRow>
  );
};
