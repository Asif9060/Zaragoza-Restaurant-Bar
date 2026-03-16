"use client";

import { useCallback, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS, lsGet } from "@/lib/localStorage";
import { generateId } from "@/lib/utils";
import { seedGallery } from "@/data/gallery";
import type { GalleryImage, GalleryCategory } from "@/types/gallery";

export function useGallery() {
  const [images, setImages] = useLocalStorage<GalleryImage[]>(
    STORAGE_KEYS.GALLERY,
    []
  );

  useEffect(() => {
    const existing = lsGet<GalleryImage[]>(STORAGE_KEYS.GALLERY);
    if (!existing || existing.length === 0) {
      setImages(seedGallery);
    }
  }, [setImages]);

  const addImage = useCallback(
    (image: Omit<GalleryImage, "id" | "displayOrder" | "createdAt">) => {
      const newImage: GalleryImage = {
        ...image,
        id: `gi-${generateId()}`,
        displayOrder: images.filter((i) => i.category === image.category).length + 1,
        createdAt: new Date().toISOString(),
      };
      setImages((prev) => [...prev, newImage]);
      return newImage;
    },
    [images, setImages]
  );

  const updateImage = useCallback(
    (id: string, updates: Partial<GalleryImage>) => {
      setImages((prev) =>
        prev.map((img) => (img.id === id ? { ...img, ...updates } : img))
      );
    },
    [setImages]
  );

  const deleteImage = useCallback(
    (id: string) => {
      setImages((prev) => prev.filter((img) => img.id !== id));
    },
    [setImages]
  );

  const toggleActive = useCallback(
    (id: string) => {
      setImages((prev) =>
        prev.map((img) =>
          img.id === id ? { ...img, isActive: !img.isActive } : img
        )
      );
    },
    [setImages]
  );

  const reorder = useCallback(
    (id: string, direction: "up" | "down") => {
      setImages((prev) => {
        const idx = prev.findIndex((i) => i.id === id);
        if (idx === -1) return prev;
        const updated = [...prev];
        const targetIdx = direction === "up" ? idx - 1 : idx + 1;
        if (targetIdx < 0 || targetIdx >= updated.length) return prev;
        [updated[idx], updated[targetIdx]] = [updated[targetIdx], updated[idx]];
        return updated.map((img, i) => ({ ...img, displayOrder: i + 1 }));
      });
    },
    [setImages]
  );

  const getByCategory = useCallback(
    (category: GalleryCategory) =>
      images
        .filter((img) => img.isActive && img.category === category)
        .sort((a, b) => a.displayOrder - b.displayOrder),
    [images]
  );

  const getActive = useCallback(
    () =>
      images
        .filter((img) => img.isActive)
        .sort((a, b) => a.displayOrder - b.displayOrder),
    [images]
  );

  return {
    images,
    addImage,
    updateImage,
    deleteImage,
    toggleActive,
    reorder,
    getByCategory,
    getActive,
  };
}
