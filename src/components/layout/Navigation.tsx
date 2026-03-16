"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, RESTAURANT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Hide nav on admin pages
  if (pathname.startsWith("/admin")) return null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-400",
          scrolled
            ? "bg-charcoal/95 backdrop-blur-md border-b border-ash shadow-lg shadow-obsidian/50"
            : "bg-transparent"
        )}
      >
        <div className="container-site">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex flex-col leading-none group">
              <span className="font-serif text-xl font-light tracking-[0.18em] uppercase text-cream group-hover:text-gold transition-colors duration-300">
                {RESTAURANT.shortName}
              </span>
              <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-gold/70 font-light mt-0.5">
                Restaurant &amp; Bar
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8" role="navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-sans text-[11px] font-normal tracking-[0.18em] uppercase transition-all duration-200 relative py-1",
                    "after:absolute after:bottom-0 after:left-0 after:h-px after:bg-gold after:transition-all after:duration-300",
                    pathname === link.href
                      ? "text-gold after:w-full"
                      : "text-cream/75 hover:text-cream after:w-0 hover:after:w-full"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Link href="/reservations">
                <Button variant="primary" size="sm">Reserve a Table</Button>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-cream hover:text-gold transition-colors p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-obsidian flex flex-col"
          >
            {/* Mobile header */}
            <div className="flex items-center justify-between px-6 h-20 border-b border-ash">
              <Link
                href="/"
                className="flex flex-col leading-none"
                onClick={() => setMobileOpen(false)}
              >
                <span className="font-serif text-xl tracking-[0.18em] uppercase text-cream">
                  {RESTAURANT.shortName}
                </span>
                <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-gold/70 font-light mt-0.5">
                  Restaurant &amp; Bar
                </span>
              </Link>
              <button
                className="text-cream hover:text-gold transition-colors p-2"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Mobile nav links */}
            <nav className="flex-1 flex flex-col justify-center px-8 gap-7">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "font-serif text-4xl font-light italic transition-colors duration-200",
                      pathname === link.href ? "text-gold" : "text-cream/80 hover:text-cream"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Mobile CTA */}
            <div className="px-8 pb-12">
              <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent mb-8" />
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => setMobileOpen(false)}
              >
                <Link href="/reservations" className="w-full text-center">
                  Reserve a Table
                </Link>
              </Button>
              <p className="text-center font-sans text-xs text-mist tracking-wider mt-4">
                {RESTAURANT.contact.phone}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
