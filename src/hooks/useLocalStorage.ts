"use client";

import { useState, useEffect, useCallback } from "react";
import { lsGet, lsSet } from "@/lib/localStorage";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = lsGet<T>(key);
    if (stored !== null) {
      setStoredValue(stored);
    }
    setHydrated(true);
  }, [key]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next = typeof value === "function" ? (value as (prev: T) => T)(prev) : value;
        if (hydrated) lsSet(key, next);
        return next;
      });
    },
    [key, hydrated]
  );

  return [storedValue, setValue];
}
