"use client";

import { useState } from "react";
import MenuHero from "@/components/menu/MenuHero";
import MenuCategoryNav from "@/components/menu/MenuCategoryNav";
import MenuSection from "@/components/menu/MenuSection";
import { useMenuItems } from "@/hooks/useMenuItems";
import type { MenuCategory } from "@/types/menu";

const CATEGORIES: MenuCategory[] = [
  "tapas-frias",
  "tapas-calientes",
  "paellas",
  "carnes",
  "mariscos",
  "postres",
  "cocktails",
  "vinos",
  "cervezas",
];

export default function MenuPageClient() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("tapas-frias");
  const { getAvailableByCategory } = useMenuItems();

  return (
    <main>
      <MenuHero />

      <MenuCategoryNav
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      {/* Dietary key */}
      <div className="bg-charcoal/30 border-b border-ash/40">
        <div className="container-site py-3">
          <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-mist">
            <span className="text-fog font-light tracking-wider uppercase text-[10px]">Key:</span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-sm bg-gold" />
              Signature
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-sm bg-green-700" />
              Vegan / Vegetarian
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-sm bg-amber-700" />
              Gluten-Free
            </span>
          </div>
        </div>
      </div>

      {/* Menu sections */}
      <div className="bg-obsidian">
        <div className="container-site section-padding">
          <div className="flex flex-col gap-16 md:gap-20">
            {CATEGORIES.map((cat) => (
              <MenuSection
                key={cat}
                category={cat}
                items={getAvailableByCategory(cat)}
              />
            ))}
          </div>

          {/* Menu note */}
          <div className="mt-16 pt-10 border-t border-ash/40 text-center">
            <p className="font-sans text-xs text-mist/60 font-light leading-relaxed max-w-lg mx-auto">
              Menu items and prices are subject to change. Please inform your server of any
              allergies or dietary requirements before ordering. All paellas require a minimum
              of 2 guests and are prepared to order — please allow 20–25 minutes.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
