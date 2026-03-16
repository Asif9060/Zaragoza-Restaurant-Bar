"use client";

import { useCallback, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS, lsGet } from "@/lib/localStorage";
import { generateId } from "@/lib/utils";
import { seedMenu } from "@/data/menu";
import type { MenuItem, MenuCategory } from "@/types/menu";

export function useMenuItems() {
  const [menuItems, setMenuItems] = useLocalStorage<MenuItem[]>(
    STORAGE_KEYS.MENU_ITEMS,
    []
  );

  // Seed on first use
  useEffect(() => {
    const existing = lsGet<MenuItem[]>(STORAGE_KEYS.MENU_ITEMS);
    if (!existing || existing.length === 0) {
      setMenuItems(seedMenu);
    }
  }, [setMenuItems]);

  const addItem = useCallback(
    (item: Omit<MenuItem, "id" | "displayOrder">) => {
      const newItem: MenuItem = {
        ...item,
        id: `mi-${generateId()}`,
        displayOrder:
          menuItems.filter((m) => m.category === item.category).length + 1,
      };
      setMenuItems((prev) => [...prev, newItem]);
      return newItem;
    },
    [menuItems, setMenuItems]
  );

  const updateItem = useCallback(
    (id: string, updates: Partial<MenuItem>) => {
      setMenuItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
      );
    },
    [setMenuItems]
  );

  const deleteItem = useCallback(
    (id: string) => {
      setMenuItems((prev) => prev.filter((item) => item.id !== id));
    },
    [setMenuItems]
  );

  const toggleAvailable = useCallback(
    (id: string) => {
      setMenuItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
        )
      );
    },
    [setMenuItems]
  );

  const toggleSignature = useCallback(
    (id: string) => {
      setMenuItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, isSignature: !item.isSignature } : item
        )
      );
    },
    [setMenuItems]
  );

  const getByCategory = useCallback(
    (category: MenuCategory) =>
      menuItems
        .filter((item) => item.category === category)
        .sort((a, b) => a.displayOrder - b.displayOrder),
    [menuItems]
  );

  const getAvailableByCategory = useCallback(
    (category: MenuCategory) =>
      menuItems
        .filter((item) => item.category === category && item.isAvailable)
        .sort((a, b) => a.displayOrder - b.displayOrder),
    [menuItems]
  );

  return {
    menuItems,
    addItem,
    updateItem,
    deleteItem,
    toggleAvailable,
    toggleSignature,
    getByCategory,
    getAvailableByCategory,
  };
}
