import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";
import GoldDivider from "@/components/ui/GoldDivider";
import Button from "@/components/ui/Button";
import { formatDateShort, formatTime } from "@/lib/utils";
import { seedEvents } from "@/data/events";

const EVENT_TYPE_COLORS: Record<string, string> = {
  flamenco: "text-wine-light bg-wine/20 border-wine/30",
  "wine-tasting": "text-gold bg-gold/10 border-gold/25",
  "special-menu": "text-gold bg-gold/10 border-gold/25",
  "live-music": "text-emerald-400 bg-emerald-900/20 border-emerald-700/30",
  holiday: "text-gold bg-gold/10 border-gold/25",
  other: "text-mist bg-ash border-slate",
};

export default function EventsTeaser() {
  const upcomingEvents = seedEvents.filter((e) => e.isActive).slice(0, 3);

  return (
    <section className="section-padding bg-charcoal/30" aria-label="Upcoming Events">
      <div className="container-site">
        <div className="text-center mb-16">
          <SectionLabel>What&apos;s On</SectionLabel>
          <SectionHeading className="mt-3 mb-2">Upcoming Events</SectionHeading>
          <GoldDivider className="max-w-xs mx-auto" />
          <p className="font-sans text-sm font-light text-mist mt-4 max-w-md mx-auto">
            From live Flamenco evenings to curated wine tastings — there is always something
            extraordinary happening at Zaragoza.
          </p>
        </div>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          staggerDelay={0.1}
        >
          {upcomingEvents.map((event) => (
            <StaggerItem key={event.id}>
              <article className="group relative flex flex-col h-full overflow-hidden rounded-lg bg-charcoal border border-ash hover:border-gold/30 transition-all duration-500">
                {/* Image */}
                {event.image && (
                  <div className="relative h-52 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent" />
                  </div>
                )}

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 gap-3">
                  {/* Type badge */}
                  <span
                    className={`self-start inline-flex items-center rounded-sm px-2 py-0.5 font-sans text-[10px] tracking-widest uppercase border ${EVENT_TYPE_COLORS[event.type] ?? EVENT_TYPE_COLORS.other}`}
                  >
                    {event.type.replace("-", " ")}
                  </span>

                  <h3 className="font-serif text-xl font-light text-cream group-hover:text-gold transition-colors duration-300">
                    {event.title}
                  </h3>

                  <p className="font-sans text-sm text-mist leading-relaxed font-light line-clamp-2 flex-1">
                    {event.description}
                  </p>

                  {/* Date & time */}
                  <div className="flex flex-col gap-1.5 pt-1 border-t border-ash/60">
                    <div className="flex items-center gap-2 text-xs text-cream/50 font-sans">
                      <Calendar size={12} className="text-gold/50 flex-shrink-0" />
                      <span>
                        {event.isRecurring
                          ? event.recurringNote
                          : formatDateShort(event.date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-cream/50 font-sans">
                      <Clock size={12} className="text-gold/50 flex-shrink-0" />
                      <span>
                        {formatTime(event.time)}
                        {event.endTime && ` — ${formatTime(event.endTime)}`}
                      </span>
                    </div>
                    {event.price !== undefined && (
                      <span className="font-sans text-xs text-gold font-normal">
                        {event.price === 0 ? "Complimentary" : `From $${event.price} per guest`}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="text-center mt-12">
          <Link href="/events" className="inline-flex items-center gap-2 group">
            <span className="font-sans text-sm tracking-widest uppercase text-gold/70 group-hover:text-gold transition-colors duration-200">
              View All Events
            </span>
            <ArrowRight
              size={14}
              className="text-gold/60 group-hover:text-gold group-hover:translate-x-1 transition-all duration-200"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
