export type EventType =
  | "flamenco"
  | "wine-tasting"
  | "special-menu"
  | "live-music"
  | "holiday"
  | "private"
  | "other";

export interface RestaurantEvent {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  date: string;
  time: string;
  endTime?: string;
  type: EventType;
  image?: string;
  price?: number;
  capacity?: number;
  ticketUrl?: string;
  isActive: boolean;
  isRecurring?: boolean;
  recurringNote?: string;
  createdAt: string;
}
