import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { MIN_WORDS_REQUIRED } from "@/constants/practice-modes";
import { ROUTES } from "@/constants/routes";

type NotEnoughWordsMessageProps = {
  categoryName: string;
};

export const NotEnoughWordsMessage = ({
  categoryName,
}: NotEnoughWordsMessageProps) => {
  return (
    <main className="flex h-full w-full items-center justify-center overflow-hidden p-4">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon" className="scale-160">
            <BookOpen className="text-muted-foreground" />
          </EmptyMedia>

          <EmptyTitle>Not enough words</EmptyTitle>

          <EmptyDescription>
            {categoryName} needs at least {MIN_WORDS_REQUIRED} words to start
            practicing.
          </EmptyDescription>
        </EmptyHeader>

        <Button asChild variant="outline">
          <Link href={ROUTES.PRACTICE}>Back to practice</Link>
        </Button>
      </Empty>
    </main>
  );
};
