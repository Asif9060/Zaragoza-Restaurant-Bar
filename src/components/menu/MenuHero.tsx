import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";

export default function MenuHero() {
  return (
    <section className="relative pt-36 pb-16 overflow-hidden" aria-label="Menu Hero">
      {/* Background */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1920&auto=format&fit=crop&q=75"
          alt=""
          className="w-full h-full object-cover opacity-20"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/80 to-obsidian" />
      </div>

      <div className="relative z-10 container-site text-center">
        <AnimatedSection delay={0}>
          <SectionLabel>What We Serve</SectionLabel>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light italic text-cream mt-3 mb-4">
            Our Menu
          </h1>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/50" />
            <span className="text-gold/60 text-xs">◆</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/50" />
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.3}>
          <p className="font-sans font-light text-mist text-base max-w-lg mx-auto">
            Authentic Spanish cuisine crafted with the finest ingredients and
            time-honored recipes from across the Iberian Peninsula.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
