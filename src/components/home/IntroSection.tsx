import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import GoldDivider from "@/components/ui/GoldDivider";
import SectionLabel from "@/components/ui/SectionLabel";
import ScriptAccent from "@/components/ui/ScriptAccent";
import Button from "@/components/ui/Button";

export default function IntroSection() {
  return (
    <section className="section-padding bg-obsidian" aria-label="Introduction">
      <div className="container-site">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection delay={0}>
            <SectionLabel>Our Story</SectionLabel>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <ScriptAccent size="lg" className="mt-4 mb-2">
              A Taste of Spain
            </ScriptAccent>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h2 className="font-serif text-4xl md:text-5xl font-light italic text-cream leading-tight mt-2 mb-6">
              Where Every Dish Tells a Story
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <GoldDivider />
          </AnimatedSection>

          <AnimatedSection delay={0.35}>
            <p className="font-sans font-light text-mist leading-relaxed text-base md:text-lg mt-6 mb-4">
              Born from a deep love of Spanish culinary tradition, Zaragoza brings the soul of
              Spain to the heart of Cleveland. Our kitchen is guided by the flavors of Valencia,
              Catalonia, and Andalucía — regions where food is not merely nourishment, but a
              celebration of life itself.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.45}>
            <p className="font-sans font-light text-mist/80 leading-relaxed text-base">
              From the wood-fired perfection of our Paellas to the convivial spirit of shared
              Tapas, every dish at Zaragoza is crafted with the finest ingredients, the deepest
              respect for tradition, and an unwavering passion for excellence.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.55}>
            <div className="mt-10">
              <Link href="/about">
                <Button variant="outline" size="md">
                  Discover Our Story
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
