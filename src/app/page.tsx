import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import AnnouncementBanner from "@/components/home/AnnouncementBanner";
import IntroSection from "@/components/home/IntroSection";
import FeaturedDishes from "@/components/home/FeaturedDishes";
import ExperienceSection from "@/components/home/ExperienceSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import EventsTeaser from "@/components/home/EventsTeaser";
import ReservationCTA from "@/components/home/ReservationCTA";

export const metadata: Metadata = {
  title: "Zaragoza Restaurant & Bar | Authentic Spanish Cuisine · Cleveland, Ohio",
  description:
    "Experience authentic Paella, Tapas, and the finest Spanish wines at Zaragoza Restaurant & Bar in Cleveland, Ohio. Opening May 2026. Reserve your table today.",
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AnnouncementBanner />
      <IntroSection />
      <FeaturedDishes />
      <ExperienceSection />
      <TestimonialsSection />
      <EventsTeaser />
      <ReservationCTA />
    </main>
  );
}
