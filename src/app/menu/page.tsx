import type { Metadata } from "next";
import MenuPageClient from "./MenuPageClient";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore our authentic Spanish menu featuring Paella Valenciana, Gambas al Ajillo, Patatas Bravas, and a curated selection of Spanish wines and cocktails.",
};

export default function MenuPage() {
  return <MenuPageClient />;
}
