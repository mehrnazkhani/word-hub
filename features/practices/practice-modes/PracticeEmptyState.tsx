import { PracticeContainer } from "./PracticeContainer";

type PracticeEmptyStateProps = {
  title?: string;
  description: React.ReactNode;
};

export const PracticeEmptyState = ({
  title = "Not enough words",
  description,
}: PracticeEmptyStateProps) => (
  <PracticeContainer current={0} total={0}>
    <main className="flex flex-1 items-center justify-center">
      <div className="max-w-sm space-y-2 text-center">
        <h1 className="font-medium">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </main>
  </PracticeContainer>
);
