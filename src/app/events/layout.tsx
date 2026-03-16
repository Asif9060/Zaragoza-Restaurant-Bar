import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Discover upcoming events at Zaragoza Restaurant & Bar — Flamenco nights, wine tastings, live music, and exclusive dining experiences in Cleveland, Ohio.",
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
