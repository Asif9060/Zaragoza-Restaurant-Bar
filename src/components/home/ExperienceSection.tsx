import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";
import GoldDivider from "@/components/ui/GoldDivider";

export default function ExperienceSection() {
  return (
    <section className="section-padding bg-obsidian overflow-hidden" aria-label="The Experience">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <AnimatedSection direction="left" className="relative">
            <div className="relative rounded-lg overflow-hidden aspect-[4/5]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&auto=format&fit=crop&q=85"
                alt="Zaragoza Restaurant interior ambiance"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Decorative gold frame */}
              <div className="absolute inset-3 border border-gold/20 rounded pointer-events-none" />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-4 lg:right-0 bg-charcoal border border-gold/25 rounded-lg p-5 shadow-2xl min-w-44">
              <p className="font-serif text-4xl text-gold font-light">20+</p>
              <p className="font-sans text-xs tracking-widest uppercase text-cream/60 mt-1 font-light">
                Years of Culinary
                <br />
                Excellence
              </p>
            </div>
          </AnimatedSection>

          {/* Text side */}
          <div className="flex flex-col gap-6">
            <AnimatedSection delay={0.1}>
              <SectionLabel align="left">The Zaragoza Experience</SectionLabel>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h2 className="font-serif text-4xl md:text-5xl font-light italic text-cream leading-tight">
                Where Passion Meets
                <br />
                <span className="text-gold">Tradition</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <GoldDivider slim className="max-w-xs" />
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <p className="font-sans font-light text-mist leading-relaxed">
                Step into a world where every detail has been considered — from the
                hand-painted Azulejo tilework and carved cedar ceiling to the curated
                playlist of Spanish guitar and the soft flicker of candlelight.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <p className="font-sans font-light text-mist/80 leading-relaxed">
                Our dining room was designed to feel like a natural extension of the great
                restaurant terraces of Barcelona and Valencia — intimate, unhurried, and
                alive with the warmth of genuine hospitality.
              </p>
            </AnimatedSection>

            {/* Values grid */}
            <AnimatedSection delay={0.5}>
              <div className="grid grid-cols-2 gap-5 mt-2">
                {[
                  { title: "Authenticity", desc: "Recipes passed down through generations" },
                  { title: "Sourcing", desc: "Finest Spanish and local ingredients" },
                  { title: "Craftsmanship", desc: "Every dish prepared with intention" },
                  { title: "Hospitality", desc: "Warm, attentive, genuinely Spanish" },
                ].map((item) => (
                  <div key={item.title} className="flex flex-col gap-1 border-l border-gold/20 pl-4">
                    <span className="font-sans text-xs tracking-widest uppercase text-gold/70 font-light">
                      {item.title}
                    </span>
                    <span className="font-sans text-sm text-mist font-light">{item.desc}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
