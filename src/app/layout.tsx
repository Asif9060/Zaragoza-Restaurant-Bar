import type { Metadata } from "next";
import { Cormorant_Garamond, Lato, Great_Vibes } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Zaragoza Restaurant & Bar | Cleveland, Ohio",
    template: "%s | Zaragoza Restaurant & Bar",
  },
  description:
    "An elegant Spanish dining experience opening May 2026 in Cleveland, Ohio. Authentic Paella, Tapas, and the finest Spanish wines in the heart of downtown.",
  keywords: [
    "Spanish restaurant Cleveland",
    "paella Cleveland",
    "tapas Cleveland",
    "Spanish food Ohio",
    "fine dining Cleveland",
    "Zaragoza restaurant",
  ],
  openGraph: {
    siteName: "Zaragoza Restaurant & Bar",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const fontVars = [
    cormorant.variable,
    lato.variable,
    greatVibes.variable,
  ].join(" ");

  return (
    <html lang="en" className={fontVars}>
      <body className="bg-obsidian text-cream antialiased">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
