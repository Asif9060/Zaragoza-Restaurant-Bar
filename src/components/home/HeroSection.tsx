"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ScriptAccent from "@/components/ui/ScriptAccent";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[640px] max-h-[1000px] flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Parallax background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 -top-16 -bottom-16 will-change-transform"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&auto=format&fit=crop&q=85"
          alt="Zaragoza Restaurant interior"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 overlay-hero" />

      {/* Wine gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-obsidian to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <ScriptAccent size="lg" className="mb-2 text-gold/90">
            Welcome to
          </ScriptAccent>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-light italic text-cream leading-none mb-6"
          style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}
        >
          Zaragoza
        </motion.h1>

        {/* Gold divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/60" />
          <span className="text-gold text-xs">◆</span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/60" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans font-light text-cream/75 tracking-[0.2em] uppercase text-sm md:text-base mb-10"
        >
          An Authentic Spanish Experience · Cleveland, Ohio
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/reservations">
            <Button variant="primary" size="lg">
              Reserve a Table
            </Button>
          </Link>
          <Link href="/menu">
            <Button variant="ghost" size="lg">
              Explore Our Menu
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-cream/40">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-gold/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
