export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "no-show";

export type OccasionType =
  | "none"
  | "birthday"
  | "anniversary"
  | "business"
  | "graduation"
  | "engagement"
  | "other";

export type SeatingPreference =
  | "no-preference"
  | "indoor"
  | "outdoor"
  | "bar"
  | "private";

export interface Reservation {
  id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  occasion?: OccasionType;
  seatingPreference?: SeatingPreference;
  dietaryRestrictions?: string;
  specialRequests?: string;
  status: ReservationStatus;
  adminNotes?: string;
  statusUpdatedAt?: string;
}

export type CreateReservationInput = Omit<
  Reservation,
  "id" | "createdAt" | "status" | "adminNotes" | "statusUpdatedAt"
>;
