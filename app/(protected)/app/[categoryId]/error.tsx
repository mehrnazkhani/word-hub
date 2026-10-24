"use client";

import { RouteError } from "@/components/RouteError";

type CategoryWordsErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const CategoryWordsError = ({ error, reset }: CategoryWordsErrorProps) => {
  return (
    <RouteError
      error={error}
      reset={reset}
      description="We couldn’t load the words for this category. Please try again."
    />
  );
};

export default CategoryWordsError;
