import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
  EmptyMedia,
} from "@/components/ui/empty";

import { AlertCircle } from "lucide-react";

const NotFound = () => {
  return (
    <main className="flex h-full w-full items-center justify-center overflow-hidden p-4">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon" className="scale-160">
            <AlertCircle className="text-muted-foreground" />
          </EmptyMedia>

          <EmptyTitle>Category not found</EmptyTitle>

          <EmptyDescription>
            The category you&apos;re looking for doesn&apos;t exist or may have
            been removed.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </main>
  );
};

export default NotFound;
