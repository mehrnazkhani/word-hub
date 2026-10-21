"use client";

import { useEffect, useState } from "react";

type PracticeTimerProps = {
  stopWhen?: boolean;
};

export const usePracticeTimer = ({
  stopWhen = false,
}: PracticeTimerProps = {}) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (stopWhen) return;

    const id = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(id);
  }, [stopWhen]);

  return { elapsedSeconds };
};
