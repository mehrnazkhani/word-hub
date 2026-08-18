"use client";

import { useEffect, useRef, useState } from "react";

type PracticeTimerProps = {
  stopWhen?: boolean;
};

export const usePracticeTimer = ({
  stopWhen = false,
}: PracticeTimerProps = {}) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return stop;
  }, []);

  useEffect(() => {
    if (stopWhen) stop();
  }, [stopWhen]);

  return { elapsedSeconds };
};
