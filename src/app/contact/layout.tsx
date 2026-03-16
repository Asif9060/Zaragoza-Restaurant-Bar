import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Zaragoza Restaurant & Bar in Cleveland, Ohio. Send us a message, make a reservation enquiry, or ask about private dining and events.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
