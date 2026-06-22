import { Inbox } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";

type EmptyStateProps = {
  title: string;
  description?: string;
};

export const EmptyUI = ({ title, description }: EmptyStateProps) => {
  return (
    <main className="flex h-full w-full items-center justify-center overflow-hidden p-4">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon" className="scale-160">
            <Inbox className="text-muted-foreground" />
          </EmptyMedia>

          <EmptyTitle>{title}</EmptyTitle>

          <EmptyDescription>{description}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </main>
  );
};
