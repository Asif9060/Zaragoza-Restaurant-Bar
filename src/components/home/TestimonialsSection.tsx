"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";
import GoldDivider from "@/components/ui/GoldDivider";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const active = testimonials.filter((t) => t.isActive);

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((i) => (i + 1) % active.length);
  }, [active.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((i) => (i - 1 + active.length) % active.length);
  }, [active.length]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const testimonial = active[currentIndex];

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0D0D0D 0%, #1A0A0A 50%, #0D0D0D 100%)",
      }}
      aria-label="Guest Testimonials"
    >
      {/* Background decorative quote mark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    font-serif text-[20rem] text-wine/5 leading-none select-none pointer-events-none"
        aria-hidden="true"
      >
        "
      </div>

      <div className="container-site relative z-10">
        <div className="text-center mb-14">
          <SectionLabel>Guests Say</SectionLabel>
          <SectionHeading className="mt-3 mb-2">Voices of Experience</SectionHeading>
          <GoldDivider className="max-w-xs mx-auto" />
        </div>

        {/* Testimonial card */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={testimonial.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < testimonial.rating ? "text-gold fill-gold" : "text-slate"}
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-serif text-xl md:text-2xl font-light italic text-cream/90 leading-relaxed mb-8">
                "{testimonial.text}"
              </blockquote>

              {/* Author */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-px bg-gold/40 mb-3" />
                <cite className="not-italic font-sans text-sm text-cream font-normal tracking-wide">
                  {testimonial.name}
                </cite>
                {testimonial.location && (
                  <span className="font-sans text-xs text-mist font-light tracking-wider">
                    {testimonial.location}
                    {testimonial.source && ` · via ${testimonial.source.charAt(0).toUpperCase() + testimonial.source.slice(1)}`}
                  </span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-ash hover:border-gold text-mist hover:text-gold transition-all duration-200 flex items-center justify-center"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {active.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1);
                    setCurrentIndex(i);
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`w-1.5 rounded-full transition-all duration-300 ${
                    i === currentIndex ? "bg-gold h-4" : "bg-slate h-1.5 hover:bg-mist"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-ash hover:border-gold text-mist hover:text-gold transition-all duration-200 flex items-center justify-center"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
