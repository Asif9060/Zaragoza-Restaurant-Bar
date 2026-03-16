export type MenuCategory =
  | "tapas-frias"
  | "tapas-calientes"
  | "paellas"
  | "carnes"
  | "mariscos"
  | "postres"
  | "cocktails"
  | "vinos"
  | "cervezas";

export interface MenuItem {
  id: string;
  name: string;
  spanishName?: string;
  description: string;
  price: number;
  category: MenuCategory;
  image?: string;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  containsNuts?: boolean;
  spiceLevel?: 0 | 1 | 2 | 3;
  isSignature?: boolean;
  isAvailable: boolean;
  displayOrder: number;
}

export const MENU_CATEGORY_LABELS: Record<MenuCategory, string> = {
  "tapas-frias": "Tapas Frías",
  "tapas-calientes": "Tapas Calientes",
  paellas: "Paellas",
  carnes: "Carnes",
  mariscos: "Mariscos",
  postres: "Postres",
  cocktails: "Cocktails",
  vinos: "Vinos",
  cervezas: "Cervezas",
};
