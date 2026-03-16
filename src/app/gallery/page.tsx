"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";
import { useGallery } from "@/hooks/useGallery";
import type { GalleryCategory } from "@/types/gallery";
import { cn } from "@/lib/utils";

const CATEGORIES: { value: GalleryCategory | "all"; label: string }[] = [
  { value: "all",      label: "All" },
  { value: "food",     label: "Cuisine" },
  { value: "ambiance", label: "Ambiance" },
  { value: "bar",      label: "Bar" },
  { value: "events",   label: "Events" },
  { value: "team",     label: "Team" },
];

export default function GalleryPage() {
  const { getActive, getByCategory } = useGallery();
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | "all">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images =
    activeCategory === "all"
      ? getActive()
      : getByCategory(activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  const nextImage = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null));

  return (
    <main>
      {/* Hero */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1920&auto=format&fit=crop&q=60" alt="" className="w-full h-full object-cover opacity-15" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/80 to-obsidian" />
        </div>
        <div className="relative z-10 container-site text-center">
          <AnimatedSection><SectionLabel>A Visual Journey</SectionLabel></AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="font-serif text-5xl md:text-6xl font-light italic text-cream mt-3 mb-4">Gallery</h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/50" />
              <span className="text-gold/60 text-xs">◆</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/50" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter tabs */}
      <div className="bg-charcoal/40 border-y border-ash sticky top-20 z-30">
        <div className="container-site py-0 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          <div className="flex items-center gap-0 min-w-max">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  "font-sans text-[11px] tracking-[0.18em] uppercase px-5 py-4 whitespace-nowrap transition-all duration-200 border-b-2",
                  activeCategory === cat.value
                    ? "text-gold border-gold"
                    : "text-cream/50 border-transparent hover:text-cream/80"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry grid */}
      <section className="section-padding bg-obsidian">
        <div className="container-site">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="masonry-grid"
            >
              {images.map((img, index) => (
                <div
                  key={img.id}
                  className="masonry-item cursor-pointer group"
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative overflow-hidden rounded-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/30 transition-all duration-400 flex items-end p-3">
                      {img.caption && (
                        <span className="font-sans text-xs text-cream/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-light">
                          {img.caption}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && images[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-obsidian/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button onClick={closeLightbox} className="absolute top-5 right-5 text-cream/70 hover:text-cream transition-colors">
              <X size={24} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 text-cream/70 hover:text-gold transition-colors p-3">
              <ChevronLeft size={32} />
            </button>
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl max-h-[85vh] px-16"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                className="max-w-full max-h-[75vh] object-contain rounded-lg"
              />
              {images[lightboxIndex].caption && (
                <p className="font-sans text-xs text-cream/60 text-center mt-3 font-light">
                  {images[lightboxIndex].caption}
                </p>
              )}
            </motion.div>
            <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 text-cream/70 hover:text-gold transition-colors p-3">
              <ChevronRight size={32} />
            </button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-xs text-cream/40">
              {lightboxIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
