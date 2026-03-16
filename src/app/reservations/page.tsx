import type { Metadata } from "next";
import ReservationFormWrapper from "@/components/reservations/ReservationFormWrapper";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Reservations",
  description:
    "Reserve your table at Zaragoza Restaurant & Bar in Cleveland, Ohio. Book online for dinner Tuesday through Sunday.",
};

export default function ReservationsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative pt-36 pb-16 overflow-hidden" aria-label="Reservations Hero">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=1920&auto=format&fit=crop&q=60"
            alt=""
            className="w-full h-full object-cover opacity-15"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-obsidian/85 to-obsidian" />
        </div>
        <div className="relative z-10 container-site text-center">
          <SectionLabel>Join Us</SectionLabel>
          <h1 className="font-serif text-5xl md:text-6xl font-light italic text-cream mt-3 mb-4">
            Reservations
          </h1>
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/50" />
            <span className="text-gold/60 text-xs">◆</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/50" />
          </div>
          <p className="font-sans font-light text-mist text-base max-w-md mx-auto">
            Reserve your table online. We look forward to welcoming you to Zaragoza.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="bg-obsidian section-padding">
        <div className="container-site">
          <div className="max-w-2xl mx-auto">
            <ReservationFormWrapper />
          </div>
        </div>
      </section>
    </main>
  );
}
