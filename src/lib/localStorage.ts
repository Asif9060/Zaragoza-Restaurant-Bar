import type { AdminSession, AdminSettings } from "@/types/admin";
import type { ContactMessage } from "@/types/contact";
import type { RestaurantEvent } from "@/types/event";
import type { GalleryImage } from "@/types/gallery";
import type { MenuItem } from "@/types/menu";
import type { Reservation } from "@/types/reservation";
import type { Testimonial } from "@/types/testimonial";

export const STORAGE_KEYS = {
  RESERVATIONS: "zrg_reservations",
  MENU_ITEMS: "zrg_menu_items",
  EVENTS: "zrg_events",
  GALLERY: "zrg_gallery",
  MESSAGES: "zrg_messages",
  ADMIN_SESSION: "zrg_admin_session",
  ADMIN_SETTINGS: "zrg_admin_settings",
} as const;

// Type-safe storage value map
export type StorageValueMap = {
  [STORAGE_KEYS.RESERVATIONS]: Reservation[];
  [STORAGE_KEYS.MENU_ITEMS]: MenuItem[];
  [STORAGE_KEYS.EVENTS]: RestaurantEvent[];
  [STORAGE_KEYS.GALLERY]: GalleryImage[];
  [STORAGE_KEYS.MESSAGES]: ContactMessage[];
  [STORAGE_KEYS.ADMIN_SESSION]: AdminSession;
  [STORAGE_KEYS.ADMIN_SETTINGS]: AdminSettings;
};

export function lsGet<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function lsSet<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage may be full or unavailable
  }
}

export function lsPush<T>(key: string, item: T): void {
  const existing = lsGet<T[]>(key) ?? [];
  lsSet(key, [...existing, item]);
}

export function lsUpdate<T extends { id: string }>(
  key: string,
  id: string,
  updates: Partial<T>
): void {
  const items = lsGet<T[]>(key) ?? [];
  const updated = items.map((item) =>
    item.id === id ? { ...item, ...updates } : item
  );
  lsSet(key, updated);
}

export function lsDelete(key: string, id: string): void {
  const items = lsGet<{ id: string }[]>(key) ?? [];
  lsSet(key, items.filter((item) => item.id !== id));
}

export function lsSeedIfEmpty<T>(key: string, data: T[]): boolean {
  if (typeof window === "undefined") return false;
  const existing = lsGet<T[]>(key);
  if (!existing || existing.length === 0) {
    lsSet(key, data);
    return true;
  }
  return false;
}

export function lsClear(key: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
}
