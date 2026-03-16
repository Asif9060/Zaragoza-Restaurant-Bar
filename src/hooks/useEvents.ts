"use client";

import { useCallback, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS, lsGet } from "@/lib/localStorage";
import { generateId } from "@/lib/utils";
import { seedEvents } from "@/data/events";
import type { RestaurantEvent } from "@/types/event";

export function useEvents() {
  const [events, setEvents] = useLocalStorage<RestaurantEvent[]>(
    STORAGE_KEYS.EVENTS,
    []
  );

  useEffect(() => {
    const existing = lsGet<RestaurantEvent[]>(STORAGE_KEYS.EVENTS);
    if (!existing || existing.length === 0) {
      setEvents(seedEvents);
    }
  }, [setEvents]);

  const addEvent = useCallback(
    (event: Omit<RestaurantEvent, "id" | "createdAt">) => {
      const newEvent: RestaurantEvent = {
        ...event,
        id: `ev-${generateId()}`,
        createdAt: new Date().toISOString(),
      };
      setEvents((prev) => [newEvent, ...prev]);
      return newEvent;
    },
    [setEvents]
  );

  const updateEvent = useCallback(
    (id: string, updates: Partial<RestaurantEvent>) => {
      setEvents((prev) =>
        prev.map((ev) => (ev.id === id ? { ...ev, ...updates } : ev))
      );
    },
    [setEvents]
  );

  const deleteEvent = useCallback(
    (id: string) => {
      setEvents((prev) => prev.filter((ev) => ev.id !== id));
    },
    [setEvents]
  );

  const toggleActive = useCallback(
    (id: string) => {
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === id ? { ...ev, isActive: !ev.isActive } : ev
        )
      );
    },
    [setEvents]
  );

  const getActive = useCallback(
    () =>
      events
        .filter((ev) => ev.isActive)
        .sort((a, b) => a.date.localeCompare(b.date)),
    [events]
  );

  const getUpcoming = useCallback(
    (count?: number) => {
      const today = new Date().toISOString().split("T")[0];
      const upcoming = events
        .filter((ev) => ev.isActive && ev.date >= today)
        .sort((a, b) => a.date.localeCompare(b.date));
      return count ? upcoming.slice(0, count) : upcoming;
    },
    [events]
  );

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    toggleActive,
    getActive,
    getUpcoming,
  };
}
