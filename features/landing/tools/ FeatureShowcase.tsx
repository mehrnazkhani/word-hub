import { WordDetail } from "./WordDetail";
import FolderList from "./FolderList";
import ImportExport from "./ImportExport";
import DonutLegend from "./Statistics";
import { ChartBarProgress } from "./ChartBarProgress";
import { PracticeList } from "./PracticeList";

export const FeatureShowcase = () => {
  return (
    <main className="flex w-full flex-col items-center gap-30 py-10">
      <WordDetail />
      <FolderList />
      <PracticeList />
      <ChartBarProgress />
      <DonutLegend />
      <ImportExport />
    </main>
  );
};
