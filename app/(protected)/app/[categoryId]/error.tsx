"use client";

import { useEffect } from "react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";

type CategoryWordsErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const CategoryWordsError = ({ error, reset }: CategoryWordsErrorProps) => {
  const { reset: resetQueries } = useQueryErrorResetBoundary();

  useEffect(() => {
    console.error(error);
    resetQueries();
  }, [error, resetQueries]);

  return (
    <main className="flex h-full w-full items-center justify-center overflow-hidden p-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="space-y-2">
          <h1 className="text-lg font-semibold">Something went wrong</h1>
          <p className="text-sm text-muted-foreground">
            We couldn’t load the words for this category. Please try again.
          </p>
        </div>

        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </main>
  );
};

export default CategoryWordsError;
