import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import SectionLabel from "@/components/ui/SectionLabel";
import GoldDivider from "@/components/ui/GoldDivider";
import Button from "@/components/ui/Button";
import ScriptAccent from "@/components/ui/ScriptAccent";
import { privateSpaces } from "@/data/team";
import { Users, Tv, Wine, ChefHat } from "lucide-react";

export const metadata: Metadata = {
  title: "Private Dining",
  description:
    "Host an unforgettable private dining experience at Zaragoza Restaurant & Bar in Cleveland. From intimate dinners to corporate events — tailor-made for every occasion.",
};

export default function PrivateDiningPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1920&auto=format&fit=crop&q=60" alt="" className="w-full h-full object-cover opacity-20" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/55 via-obsidian/80 to-obsidian" />
        </div>
        <div className="relative z-10 container-site text-center">
          <AnimatedSection><SectionLabel>Exclusive Experiences</SectionLabel></AnimatedSection>
          <AnimatedSection delay={0.1}>
            <ScriptAccent size="md" className="mt-4">Your Event, Your Way</ScriptAccent>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <h1 className="font-serif text-5xl md:text-6xl font-light italic text-cream mt-2 mb-4">Private Dining</h1>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/50" />
              <span className="text-gold/60 text-xs">◆</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/50" />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.4}>
            <p className="font-sans font-light text-mist text-base max-w-md mx-auto">
              From intimate anniversaries to landmark corporate events, Zaragoza offers bespoke private dining experiences to match every occasion.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Private Dining at Zaragoza */}
      <section className="section-padding bg-obsidian">
        <div className="container-site">
          <div className="text-center mb-14">
            <SectionLabel>Why Zaragoza</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl font-light italic text-cream mt-3 mb-2">An Event Worth Remembering</h2>
            <GoldDivider className="max-w-xs mx-auto" />
          </div>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6" staggerDelay={0.1}>
            {[
              { icon: ChefHat, title: "Custom Menus", desc: "Chef Alejandro designs bespoke menus for your event and dietary needs" },
              { icon: Wine, title: "Sommelier Service", desc: "Marco pairs exceptional Spanish wines to complement every course" },
              { icon: Users, title: "Dedicated Staff", desc: "A private team of servers attends exclusively to your party" },
              { icon: Tv, title: "AV & Tech", desc: "Full audiovisual capabilities for corporate presentations and celebrations" },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className="flex flex-col items-center text-center gap-3 p-5 rounded-lg bg-charcoal border border-ash">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20">
                    <item.icon size={18} className="text-gold" />
                  </div>
                  <h3 className="font-serif text-lg font-light text-cream">{item.title}</h3>
                  <p className="font-sans text-xs text-mist font-light leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Spaces */}
      <section className="section-padding bg-charcoal/30">
        <div className="container-site">
          <div className="text-center mb-14">
            <SectionLabel>Our Spaces</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl font-light italic text-cream mt-3 mb-2">Private Dining Rooms</h2>
            <GoldDivider className="max-w-xs mx-auto" />
          </div>
          <div className="flex flex-col gap-12">
            {privateSpaces.map((space, index) => (
              <AnimatedSection key={space.id} direction={index % 2 === 0 ? "left" : "right"}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${index % 2 !== 0 ? "lg:grid-flow-dense" : ""}`}>
                  <div className={`relative rounded-lg overflow-hidden aspect-[16/9] ${index % 2 !== 0 ? "lg:col-start-2" : ""}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={space.image} alt={space.name} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-3 border border-gold/15 rounded pointer-events-none" />
                  </div>
                  <div className={`flex flex-col gap-5 ${index % 2 !== 0 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                    <h3 className="font-serif text-3xl font-light italic text-cream">{space.name}</h3>
                    <GoldDivider slim className="max-w-xs" />
                    <p className="font-sans text-sm text-mist leading-relaxed font-light">{space.description}</p>
                    <div className="flex flex-col gap-2">
                      <span className="font-sans text-xs tracking-widest uppercase text-gold/70">Capacity</span>
                      <span className="font-sans text-sm text-cream">{space.capacity}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="font-sans text-xs tracking-widest uppercase text-gold/70">Features</span>
                      <ul className="flex flex-col gap-1">
                        {space.features.map((f) => (
                          <li key={f} className="font-sans text-sm text-mist font-light flex items-center gap-2">
                            <span className="text-gold/60 text-xs">◆</span> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding-sm bg-wine/20 border-y border-wine/25 text-center">
        <div className="container-site max-w-xl mx-auto">
          <h2 className="font-serif text-3xl font-light italic text-cream mb-4">Plan Your Event</h2>
          <p className="font-sans text-sm text-mist font-light mb-8 leading-relaxed">
            Contact our events team to discuss your requirements, menu preferences, and to check availability. We will create a tailored proposal just for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button variant="primary" size="lg">Enquire Now</Button>
            </Link>
            <Link href="/reservations">
              <Button variant="ghost" size="lg">Reserve a Regular Table</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
