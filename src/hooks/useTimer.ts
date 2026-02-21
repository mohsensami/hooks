import { useState, useEffect, useRef, useCallback } from "react";

type TimerMode = "countdown" | "countup";

interface UseTimerOptions {
  initialTime?: number;
  autoStart?: boolean;
  mode?: TimerMode;
  onFinish?: () => void;
}

interface UseTimerReturn {
  time: number;
  minutes: number;
  seconds: number;
  formattedTime: string;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: (newTime?: number) => void;
}

const useTimer = ({
  initialTime = 0,
  autoStart = false,
  mode = "countdown",
  onFinish,
}: UseTimerOptions): UseTimerReturn => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart);

  const startTimestampRef = useRef<number | null>(null);
  const pausedTimeRef = useRef<number>(initialTime);
  const rafRef = useRef<number | null>(null);

  // ✅ loop ref (حل مشکل eslint + stale closure)
  const loopRef = useRef<() => void>(() => {});

  // ---------- timer calculation ----------
  const calculateTime = useCallback(() => {
    if (!startTimestampRef.current) return;

    const now = Date.now();
    const elapsed = Math.floor((now - startTimestampRef.current) / 1000);

    const newTime =
      mode === "countdown"
        ? Math.max(pausedTimeRef.current - elapsed, 0)
        : pausedTimeRef.current + elapsed;

    setTime(newTime);

    // finish
    if (mode === "countdown" && newTime === 0) {
      setIsRunning(false);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      onFinish?.();
      return;
    }
  }, [mode, onFinish]);

  // ✅ همیشه آخرین calculateTime داخل ref
  useEffect(() => {
    loopRef.current = () => {
      calculateTime();
      rafRef.current = requestAnimationFrame(loopRef.current);
    };
  }, [calculateTime]);

  // ---------- controls ----------
  const start = useCallback(() => {
    if (isRunning) return;

    startTimestampRef.current = Date.now();
    setIsRunning(true);
  }, [isRunning]);

  const pause = useCallback(() => {
    if (!isRunning) return;

    pausedTimeRef.current = time;
    setIsRunning(false);

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, [isRunning, time]);

  const reset = useCallback(
    (newTime?: number) => {
      const next = newTime ?? initialTime;

      pausedTimeRef.current = next;
      startTimestampRef.current = null;

      setTime(next);
      setIsRunning(false);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    [initialTime],
  );

  // ---------- RAF lifecycle ----------
  useEffect(() => {
    if (isRunning) {
      rafRef.current = requestAnimationFrame(loopRef.current);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isRunning]);

  // ---------- derived ----------
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return {
    time,
    minutes,
    seconds,
    formattedTime,
    isRunning,
    start,
    pause,
    reset,
  };
};

export default useTimer;
