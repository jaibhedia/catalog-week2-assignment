import { useState, useEffect, useRef } from "react";

/**
 * Updates the returned value at most once every `limit` milliseconds.
 */
export function useThrottle<T>(value: T, limit = 500): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    const remaining = limit - (now - lastRan.current);
  
    if (remaining <= 0) {
      console.log("Throttle update:", value);
      setThrottledValue(value);
      lastRan.current = now;
    } else {
      const timer = setTimeout(() => {
        console.log("Throttle delayed update:", value);
        setThrottledValue(value);
        lastRan.current = Date.now();
      }, remaining);
  
      return () => clearTimeout(timer);
    }
  }, [value, limit]);
  

  return throttledValue;
}
