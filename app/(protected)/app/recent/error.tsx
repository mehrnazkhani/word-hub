"use client";

import { RouteError } from "@/components/RouteError";

type RecentWordsErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const RecentWordsError = ({ error, reset }: RecentWordsErrorProps) => {
  return (
    <RouteError
      error={error}
      reset={reset}
      description="We couldn’t load your recent words. Please try again."
    />
  );
};

export default RecentWordsError;
