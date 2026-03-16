"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MENU_CATEGORY_LABELS } from "@/types/menu";
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

interface MenuCategoryNavProps {
  activeCategory: MenuCategory;
  onSelect: (category: MenuCategory) => void;
}

export default function MenuCategoryNav({
  activeCategory,
  onSelect,
}: MenuCategoryNavProps) {
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = navRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const handleSelect = (category: MenuCategory) => {
    onSelect(category);
    const el = document.getElementById(`menu-${category}`);
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    // Scroll the nav tab into view
    const tabEl = scrollRef.current?.querySelector(`[data-cat="${category}"]`);
    tabEl?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <>
      <div ref={navRef} />
      <div
        className={cn(
          "sticky top-[80px] z-30 transition-all duration-300",
          isSticky
            ? "bg-charcoal/95 backdrop-blur-md border-b border-ash shadow-lg"
            : "bg-obsidian/90 border-b border-ash/40"
        )}
      >
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex items-center gap-0 min-w-max px-4 md:px-0 md:container-site">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                data-cat={cat}
                onClick={() => handleSelect(cat)}
                className={cn(
                  "font-sans text-[11px] tracking-[0.18em] uppercase px-4 py-4 whitespace-nowrap transition-all duration-200 border-b-2 flex-shrink-0",
                  activeCategory === cat
                    ? "text-gold border-gold"
                    : "text-cream/50 border-transparent hover:text-cream/80 hover:border-cream/20"
                )}
              >
                {MENU_CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
