import type { Metadata } from "next";
import Link from "next/link";
import { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";
import GoldDivider from "@/components/ui/GoldDivider";
import ScriptAccent from "@/components/ui/ScriptAccent";
import Button from "@/components/ui/Button";
import { team } from "@/data/team";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Discover the story behind Zaragoza Restaurant & Bar — authentic Spanish cuisine by Chef Alejandro Vargas, opening May 2026 in Cleveland, Ohio.",
};

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&auto=format&fit=crop&q=60"
            alt=""
            className="w-full h-full object-cover opacity-20"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/80 to-obsidian" />
        </div>
        <div className="relative z-10 container-site text-center">
          <AnimatedSection delay={0}><SectionLabel>Our Journey</SectionLabel></AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h1 className="font-serif text-5xl md:text-6xl font-light italic text-cream mt-3 mb-4">
              Our Story
            </h1>
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

      {/* Origin story */}
      <section className="section-padding bg-obsidian">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <AnimatedSection direction="left">
              <div className="relative rounded-lg overflow-hidden aspect-[4/5]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=900&auto=format&fit=crop"
                  alt="Chef Alejandro Vargas"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-3 border border-gold/15 rounded pointer-events-none" />
              </div>
            </AnimatedSection>
            <div className="flex flex-col gap-6">
              <AnimatedSection delay={0.1}><SectionLabel align="left">The Beginning</SectionLabel></AnimatedSection>
              <AnimatedSection delay={0.2}>
                <ScriptAccent size="md" align="left">Born from a Love of Spain</ScriptAccent>
              </AnimatedSection>
              <AnimatedSection delay={0.25}><GoldDivider slim className="max-w-xs" /></AnimatedSection>
              <AnimatedSection delay={0.3}>
                <p className="font-sans font-light text-mist leading-relaxed">
                  Zaragoza was born from a lifelong love affair with Spanish culture, cuisine, and
                  the art of gathering around a great table. Our Executive Chef Alejandro Vargas,
                  born in Valencia and trained in the finest kitchens of Madrid and Barcelona,
                  dreamed of bringing the authentic flavors of Spain to the American Midwest.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.4}>
                <p className="font-sans font-light text-mist/80 leading-relaxed">
                  After two decades perfecting his craft and earning recognition across Europe,
                  Chef Alejandro chose Cleveland — a city with deep roots, genuine community spirit,
                  and a dining scene hungry for something truly exceptional.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.5}>
                <p className="font-sans font-light text-mist/80 leading-relaxed">
                  The result is Zaragoza: a restaurant designed not merely to serve food, but to
                  transport every guest to the sun-drenched plazas and intimate tavernas of Spain.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Culinary philosophy */}
      <section className="section-padding bg-charcoal/30">
        <div className="container-site max-w-4xl mx-auto text-center">
          <AnimatedSection><SectionLabel>Our Philosophy</SectionLabel></AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-serif text-4xl md:text-5xl font-light italic text-cream mt-3 mb-2">
              Beyond the Recipe
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}><GoldDivider className="max-w-xs mx-auto" /></AnimatedSection>
          <AnimatedSection delay={0.3}>
            <p className="font-sans font-light text-mist leading-relaxed text-base md:text-lg mt-6 mb-4">
              Spanish cooking is fundamentally social. It celebrates quality ingredients, patient
              technique, and above all, the pleasure of sharing. At Zaragoza, we honor this
              philosophy in everything we do.
            </p>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12" staggerDelay={0.1}>
            {[
              {
                title: "The Finest Ingredients",
                text: "We source Jamón Ibérico de Bellota directly from small producers in Extremadura, Spanish saffron from La Mancha, and the finest Arbequina olive oils from Catalonia.",
              },
              {
                title: "Tradition & Innovation",
                text: "Our menu honors centuries of Spanish culinary heritage while embracing the best seasonal ingredients available in Ohio. We are classical in spirit, contemporary in execution.",
              },
              {
                title: "The Ritual of Dining",
                text: "At Zaragoza, there is no rush. We believe the greatest meals are unhurried — a series of small courses, shared by people who matter, stretched over a long and memorable evening.",
              },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className="flex flex-col items-center text-center gap-4 p-6 rounded-lg bg-charcoal border border-ash">
                  <div className="w-8 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                  <h3 className="font-serif text-xl font-light text-cream">{item.title}</h3>
                  <p className="font-sans text-sm text-mist font-light leading-relaxed">{item.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-obsidian">
        <div className="container-site">
          <div className="text-center mb-14">
            <SectionLabel>The People</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl font-light italic text-cream mt-3 mb-2">
              Meet the Team
            </h2>
            <GoldDivider className="max-w-xs mx-auto" />
          </div>
          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            staggerDelay={0.1}
          >
            {team.filter((m) => m.featured).map((member) => (
              <StaggerItem key={member.id}>
                <div className="group flex flex-col gap-4">
                  <div className="relative rounded-lg overflow-hidden aspect-[3/4]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-serif text-xl font-light text-cream">{member.name}</h3>
                      <p className="font-sans text-xs tracking-widest uppercase text-gold/80 mt-0.5">{member.role}</p>
                    </div>
                  </div>
                  <p className="font-sans text-sm text-mist leading-relaxed font-light">{member.bio}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Reserve CTA */}
      <section className="section-padding-sm bg-charcoal/30 border-t border-ash text-center">
        <div className="container-site max-w-xl mx-auto">
          <h2 className="font-serif text-3xl font-light italic text-cream mb-4">
            Come Experience Zaragoza
          </h2>
          <p className="font-sans text-sm text-mist font-light mb-8">
            Opening May 2026 in Downtown Cleveland. Reservations are now open.
          </p>
          <Link href="/reservations">
            <Button variant="primary" size="lg">Reserve a Table</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
