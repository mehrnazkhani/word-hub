"use client";

import { RouteError } from "@/components/RouteError";

type TrashErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const TrashError = ({ error, reset }: TrashErrorProps) => {
  return (
    <RouteError
      error={error}
      reset={reset}
      description="We couldn’t load your deleted words. Please try again."
    />
  );
};

export default TrashError;
