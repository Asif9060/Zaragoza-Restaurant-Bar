"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, X, ChevronRight } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";
import GoldDivider from "@/components/ui/GoldDivider";
import Button from "@/components/ui/Button";
import { useEvents } from "@/hooks/useEvents";
import { formatDateShort, formatTime } from "@/lib/utils";
import type { RestaurantEvent, EventType } from "@/types/event";

const TYPE_LABELS: Record<EventType, string> = {
  flamenco: "Flamenco",
  "wine-tasting": "Wine Tasting",
  "special-menu": "Special Menu",
  "live-music": "Live Music",
  holiday: "Holiday",
  private: "Private",
  other: "Event",
};

const TYPE_COLORS: Record<EventType, string> = {
  flamenco: "text-wine-light bg-wine/15 border-wine/25",
  "wine-tasting": "text-gold bg-gold/10 border-gold/25",
  "special-menu": "text-gold bg-gold/10 border-gold/25",
  "live-music": "text-emerald-400 bg-emerald-900/20 border-emerald-700/30",
  holiday: "text-gold bg-gold/10 border-gold/25",
  private: "text-mist bg-ash border-slate",
  other: "text-mist bg-ash border-slate",
};

function EventDetailModal({
  event,
  onClose,
}: {
  event: RestaurantEvent;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-obsidian/85 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-charcoal border-t sm:border border-ash sm:rounded-lg overflow-hidden max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {event.image && (
            <div className="relative h-56 flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent" />
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-obsidian/70 text-cream hover:text-gold flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
          <div className="p-6 flex flex-col gap-4">
            <span className={`self-start inline-flex items-center rounded-sm px-2 py-0.5 font-sans text-[10px] tracking-widest uppercase border ${TYPE_COLORS[event.type]}`}>
              {TYPE_LABELS[event.type]}
            </span>
            <h2 className="font-serif text-2xl font-light text-cream">{event.title}</h2>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs text-cream/60 font-sans">
                <Calendar size={13} className="text-gold/60" />
                {event.isRecurring ? event.recurringNote : formatDateShort(event.date)}
              </div>
              <div className="flex items-center gap-2 text-xs text-cream/60 font-sans">
                <Clock size={13} className="text-gold/60" />
                {formatTime(event.time)}{event.endTime && ` — ${formatTime(event.endTime)}`}
              </div>
              {event.price !== undefined && (
                <span className="font-sans text-sm text-gold">
                  {event.price === 0 ? "Complimentary" : `From $${event.price} per guest`}
                </span>
              )}
            </div>
            <p className="font-sans text-sm text-mist leading-relaxed font-light">
              {event.longDescription ?? event.description}
            </p>
            <Button variant="primary" size="md" fullWidth>
              <a href="/reservations" className="w-full text-center">Reserve Your Spot</a>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function EventsPage() {
  const { getActive } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<RestaurantEvent | null>(null);

  const events = getActive();

  return (
    <main>
      {/* Hero */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=1920&auto=format&fit=crop&q=60" alt="" className="w-full h-full object-cover opacity-20" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/80 to-obsidian" />
        </div>
        <div className="relative z-10 container-site text-center">
          <AnimatedSection><SectionLabel>What&apos;s On</SectionLabel></AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="font-serif text-5xl md:text-6xl font-light italic text-cream mt-3 mb-4">Events & Experiences</h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/50" />
              <span className="text-gold/60 text-xs">◆</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/50" />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <p className="font-sans font-light text-mist text-base max-w-md mx-auto">
              From live Flamenco nights to curated wine tastings, every visit to Zaragoza is an experience.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Events grid */}
      <section className="section-padding bg-obsidian">
        <div className="container-site">
          {events.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-sans text-mist text-lg">No upcoming events at the moment.</p>
              <p className="font-sans text-stone text-sm mt-2">Check back soon for exciting events!</p>
            </div>
          ) : (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8" staggerDelay={0.1}>
              {events.map((event) => (
                <StaggerItem key={event.id}>
                  <article
                    className="group relative flex flex-col h-full overflow-hidden rounded-lg bg-charcoal border border-ash hover:border-gold/30 transition-all duration-500 cursor-pointer"
                    onClick={() => setSelectedEvent(event)}
                  >
                    {event.image && (
                      <div className="relative h-60 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent" />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1 gap-3">
                      <span className={`self-start inline-flex items-center rounded-sm px-2 py-0.5 font-sans text-[10px] tracking-widest uppercase border ${TYPE_COLORS[event.type]}`}>
                        {TYPE_LABELS[event.type]}
                        {event.isRecurring && <span className="ml-1">· Recurring</span>}
                      </span>
                      <h3 className="font-serif text-2xl font-light text-cream group-hover:text-gold transition-colors duration-300">{event.title}</h3>
                      <p className="font-sans text-sm text-mist font-light leading-relaxed flex-1 line-clamp-2">{event.description}</p>
                      <div className="flex flex-col gap-1.5 pt-2 border-t border-ash/60">
                        <div className="flex items-center gap-2 text-xs text-cream/50 font-sans">
                          <Calendar size={12} className="text-gold/50" />
                          {event.isRecurring ? event.recurringNote : formatDateShort(event.date)}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-cream/50 font-sans">
                          <Clock size={12} className="text-gold/50" />
                          {formatTime(event.time)}{event.endTime && ` — ${formatTime(event.endTime)}`}
                        </div>
                        {event.price !== undefined && (
                          <span className="font-sans text-xs text-gold">
                            {event.price === 0 ? "Complimentary" : `From $${event.price} per guest`}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gold/70 group-hover:text-gold transition-colors mt-1">
                        <span className="font-sans tracking-wider uppercase">Learn More</span>
                        <ChevronRight size={12} />
                      </div>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>

      {selectedEvent && (
        <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </main>
  );
}
