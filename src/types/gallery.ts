export type GalleryCategory =
  | "food"
  | "ambiance"
  | "events"
  | "team"
  | "bar";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  category: GalleryCategory;
  width?: number;
  height?: number;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
}
