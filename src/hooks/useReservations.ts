"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "@/lib/localStorage";
import { generateReservationId, todayString } from "@/lib/utils";
import type {
  Reservation,
  ReservationStatus,
  CreateReservationInput,
} from "@/types/reservation";

export function useReservations() {
  const [reservations, setReservations] = useLocalStorage<Reservation[]>(
    STORAGE_KEYS.RESERVATIONS,
    []
  );

  const addReservation = useCallback(
    (input: CreateReservationInput): Reservation => {
      const newReservation: Reservation = {
        ...input,
        id: generateReservationId(input.date),
        createdAt: new Date().toISOString(),
        status: "pending",
      };
      setReservations((prev) => [newReservation, ...prev]);
      return newReservation;
    },
    [setReservations]
  );

  const updateStatus = useCallback(
    (id: string, status: ReservationStatus) => {
      setReservations((prev) =>
        prev.map((r) =>
          r.id === id
            ? { ...r, status, statusUpdatedAt: new Date().toISOString() }
            : r
        )
      );
    },
    [setReservations]
  );

  const updateAdminNotes = useCallback(
    (id: string, adminNotes: string) => {
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, adminNotes } : r))
      );
    },
    [setReservations]
  );

  const deleteReservation = useCallback(
    (id: string) => {
      setReservations((prev) => prev.filter((r) => r.id !== id));
    },
    [setReservations]
  );

  const getByDate = useCallback(
    (date: string) => reservations.filter((r) => r.date === date),
    [reservations]
  );

  const getTodayCount = useCallback(
    () => reservations.filter((r) => r.date === todayString()).length,
    [reservations]
  );

  const getPendingCount = useCallback(
    () => reservations.filter((r) => r.status === "pending").length,
    [reservations]
  );

  const getByStatus = useCallback(
    (status: ReservationStatus) =>
      reservations.filter((r) => r.status === status),
    [reservations]
  );

  const getRecent = useCallback(
    (count: number) =>
      [...reservations]
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .slice(0, count),
    [reservations]
  );

  return {
    reservations,
    addReservation,
    updateStatus,
    updateAdminNotes,
    deleteReservation,
    getByDate,
    getTodayCount,
    getPendingCount,
    getByStatus,
    getRecent,
    total: reservations.length,
  };
}
