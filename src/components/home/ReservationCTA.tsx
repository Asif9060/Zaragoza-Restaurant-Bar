import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";
import ScriptAccent from "@/components/ui/ScriptAccent";

export default function ReservationCTA() {
  return (
    <section
      className="relative py-28 md:py-36 overflow-hidden"
      aria-label="Make a Reservation"
      style={{
        background: "linear-gradient(135deg, #5C1515 0%, #7B1C1C 40%, #5C1515 100%)",
      }}
    >
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            rgba(201,168,76,0.6) 20px,
            rgba(201,168,76,0.6) 21px
          )`,
        }}
        aria-hidden="true"
      />

      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative z-10 container-site text-center">
        <AnimatedSection delay={0}>
          <ScriptAccent size="md" className="text-gold/80 mb-2">
            Join Us
          </ScriptAccent>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light italic text-cream leading-tight mb-4">
            Reserve Your Table
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-cream/30" />
            <span className="text-cream/40 text-xs">◆</span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-cream/30" />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <p className="font-sans font-light text-cream/70 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Whether it&apos;s an intimate dinner for two or a celebration with family and friends,
            we look forward to welcoming you to Zaragoza.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/reservations">
              <Button
                variant="primary"
                size="lg"
                className="!bg-cream !text-obsidian hover:!bg-ivory shadow-lg"
              >
                Make a Reservation
              </Button>
            </Link>
            <Link href="/private-dining">
              <Button variant="ghost" size="lg" className="border-cream/30 text-cream hover:border-cream">
                Private Dining
              </Button>
            </Link>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.5}>
          <p className="font-sans text-xs text-cream/40 tracking-widest uppercase mt-8">
            Tuesday – Sunday · 5:00 PM onwards
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
