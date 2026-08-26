import { WordDetailShowcase } from "./landing-features/WordDetailShowcase";
import { CategoryListShowcase } from "./landing-features/CategoryListShowcase";
import { DailyWordSuggestionShowcase } from "./landing-features/DailyWordSuggestionShowcase";
import { ChartBarProgress } from "./landing-features/ChartBarProgress";
import { VocabularyStatsShowcase } from "./landing-features/VocabularyStatsShowcase";
import { ImportExport } from "./landing-features/ImportExport";

export const FeaturesSection = () => {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="flex w-full scroll-mt-20 flex-col gap-20 py-10"
    >
      <h2 id="features-heading" className="text-center text-3xl font-black">
        What's in Word Hub?
      </h2>

      <div className="flex flex-col items-center gap-20 md:gap-35">
        <WordDetailShowcase />
        <CategoryListShowcase />
        <DailyWordSuggestionShowcase />
        <ChartBarProgress />
        <VocabularyStatsShowcase />
        <ImportExport />
      </div>
    </section>
  );
};
