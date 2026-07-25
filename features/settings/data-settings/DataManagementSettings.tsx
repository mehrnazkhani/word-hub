import { Separator } from "@/components/ui/separator";
import { DataOverview } from "./data-count/DataOverview";
import { ExportData } from "./ExportData";
import { DeleteAllData } from "./DeleteAllData";

const DataManagementSettings = () => {
  return (
    <div className="space-y-5">
      <DataOverview />
      <Separator />
      <ExportData />
      <Separator />
      <DeleteAllData />
    </div>
  );
};

export default DataManagementSettings;
