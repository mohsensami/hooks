import { useCallback, useRef } from "react";

export function useThrottle(duration) {
  const lastCall = useRef(0);

  const throttle = useCallback(
    (callback) => {
      return (...args) => {
        if (lastCall.current + duration < Date.now()) {
          lastCall.current = Date.now();
          callback(...args);
        }
      };
    },
    [duration]
  );

  return throttle;
}
