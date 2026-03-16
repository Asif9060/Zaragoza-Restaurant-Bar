import Link from "next/link";
import { Instagram, Facebook, Phone, MapPin, Clock, Mail } from "lucide-react";
import { RESTAURANT, NAV_LINKS } from "@/lib/constants";
import GoldDivider from "@/components/ui/GoldDivider";

const footerNav = [
  { heading: "Discover", links: NAV_LINKS },
  {
    heading: "Experience",
    links: [
      { label: "Reservations", href: "/reservations" },
      { label: "Private Dining", href: "/private-dining" },
      { label: "Events", href: "/events" },
      { label: "Gift Cards", href: "/contact" },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal border-t border-ash">
      {/* Main footer content */}
      <div className="container-site section-padding-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex flex-col leading-none mb-5 group">
              <span className="font-serif text-2xl font-light tracking-[0.15em] uppercase text-cream group-hover:text-gold transition-colors duration-300">
                {RESTAURANT.shortName}
              </span>
              <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-gold/60 font-light mt-1">
                Restaurant &amp; Bar
              </span>
            </Link>
            <p className="font-sans text-sm text-mist leading-relaxed mb-6 font-light max-w-xs">
              An authentic Spanish dining experience in the heart of Cleveland, Ohio.
              Opening May 2026.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-4">
              <a
                href={RESTAURANT.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-mist hover:text-gold transition-colors duration-200"
              >
                <Instagram size={18} />
              </a>
              <a
                href={RESTAURANT.contact.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-mist hover:text-gold transition-colors duration-200"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {footerNav.map((section) => (
            <div key={section.heading}>
              <h4 className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold/70 mb-4 font-light">
                {section.heading}
              </h4>
              <ul className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-mist hover:text-cream transition-colors duration-200 font-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact & Hours */}
          <div>
            <h4 className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold/70 mb-4 font-light">
              Visit Us
            </h4>
            <ul className="flex flex-col gap-3.5">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-gold/60 mt-0.5 flex-shrink-0" />
                <span className="font-sans text-sm text-mist font-light leading-snug">
                  {RESTAURANT.address.street}
                  <br />
                  {RESTAURANT.address.city}, {RESTAURANT.address.state} {RESTAURANT.address.zip}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-gold/60 flex-shrink-0" />
                <a
                  href={`tel:${RESTAURANT.contact.phoneRaw}`}
                  className="font-sans text-sm text-mist hover:text-cream transition-colors font-light"
                >
                  {RESTAURANT.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-gold/60 flex-shrink-0" />
                <a
                  href={`mailto:${RESTAURANT.contact.email}`}
                  className="font-sans text-sm text-mist hover:text-cream transition-colors font-light"
                >
                  {RESTAURANT.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 pt-1">
                <Clock size={14} className="text-gold/60 mt-0.5 flex-shrink-0" />
                <div className="flex flex-col gap-0.5">
                  {RESTAURANT.hours.slice(1).map((h) => (
                    <div key={h.day} className="flex gap-2 font-sans text-xs text-mist font-light">
                      <span className="w-7">{h.dayShort}</span>
                      <span>{h.open ? `${h.open} – ${h.close}` : "Closed"}</span>
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <GoldDivider className="mx-8 my-0" />

      {/* Bottom bar */}
      <div className="container-site py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-stone font-light tracking-wide">
            © {currentYear} {RESTAURANT.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/contact" className="font-sans text-xs text-stone hover:text-mist transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="font-sans text-xs text-stone hover:text-mist transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
