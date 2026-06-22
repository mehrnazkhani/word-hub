import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";

const LoadingPage = () => {
  return (
    <main className="flex h-full w-full items-center justify-center overflow-hidden p-4">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon" className="scale-160">
            <Spinner className="text-muted-foreground" />
          </EmptyMedia>
          <EmptyTitle>Processing your request</EmptyTitle>
          <EmptyDescription>
            Please wait while we process your request. Do not refresh the page.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </main>
  );
};

export default LoadingPage;
