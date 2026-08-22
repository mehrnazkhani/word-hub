import { WordDetail } from "./landing-features/WordDetail";
import FolderList from "./landing-features/FolderList";
import ImportExport from "./landing-features/ImportExport";
import DonutLegend from "./landing-features/Statistics";
import { ChartBarProgress } from "./landing-features/ChartBarProgress";
import { PracticeList } from "./landing-features/PracticeList";

export const LandingFeatures = () => {
  return (
    <main
      id="features"
      className="flex w-full scroll-mt-20 flex-col gap-20 py-10"
    >
      <h1 className="text-center text-3xl font-black">What's in Word Hub?</h1>

      <div className="flex flex-col items-center gap-20 md:gap-35">
        <WordDetail />
        <FolderList />
        <PracticeList />
        <ChartBarProgress />
        <DonutLegend />
        <ImportExport />
      </div>
    </main>
  );
};
