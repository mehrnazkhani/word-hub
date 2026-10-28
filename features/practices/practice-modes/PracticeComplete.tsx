import { PracticeContainer } from "./PracticeContainer";
import { PracticeResultDialog } from "./PracticeResultDialog";

type PracticeCompleteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  correctCount: number;
  incorrectCount: number;
  elapsedSeconds: number;
  totalWords: number;
};

export const PracticeComplete = ({
  open,
  onOpenChange,
  correctCount,
  incorrectCount,
  elapsedSeconds,
  totalWords,
}: PracticeCompleteProps) => (
  <PracticeContainer current={totalWords} total={totalWords}>
    <main className="flex flex-1 items-center justify-center">
      <p className="text-sm text-muted-foreground">Practice complete</p>
    </main>

    <PracticeResultDialog
      open={open}
      onOpenChange={onOpenChange}
      correctCount={correctCount}
      incorrectCount={incorrectCount}
      elapsedSeconds={elapsedSeconds}
      totalWords={totalWords}
    />
  </PracticeContainer>
);
