import { PracticeContainer } from "./PracticeContainer";

export const PracticeLoading = () => (
  <PracticeContainer current={0} total={0}>
    <main className="flex flex-1 items-center justify-center">
      <p className="text-sm text-muted-foreground">Loading…</p>
    </main>
  </PracticeContainer>
);
