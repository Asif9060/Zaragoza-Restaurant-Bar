export const RESTAURANT = {
  name: "Zaragoza Restaurant & Bar",
  shortName: "Zaragoza",
  tagline: "An Authentic Spanish Experience",
  description:
    "Experience the rich culinary traditions of Spain in the heart of Cleveland. From wood-fired Paellas to handcrafted Tapas, every dish tells the story of a culture deeply rooted in flavor, passion, and the joy of gathering.",
  address: {
    street: "1234 Euclid Avenue",
    city: "Cleveland",
    state: "OH",
    zip: "44115",
    neighborhood: "Downtown Cleveland",
    full: "1234 Euclid Avenue, Cleveland, OH 44115",
  },
  contact: {
    phone: "(216) 555-0142",
    phoneRaw: "12165550142",
    email: "reservations@zaragozacleveland.com",
    generalEmail: "hello@zaragozacleveland.com",
    instagram: "@zaragozacleveland",
    facebook: "ZaragozaCleveland",
    instagramUrl: "https://instagram.com/zaragozacleveland",
    facebookUrl: "https://facebook.com/ZaragozaCleveland",
  },
  openingDate: "May 2026",
  openingMonth: "05",
  openingYear: "2026",
  hours: [
    { day: "Monday", dayShort: "Mon", open: null, close: null },
    { day: "Tuesday", dayShort: "Tue", open: "5:00 PM", close: "10:00 PM" },
    { day: "Wednesday", dayShort: "Wed", open: "5:00 PM", close: "10:00 PM" },
    { day: "Thursday", dayShort: "Thu", open: "5:00 PM", close: "10:00 PM" },
    { day: "Friday", dayShort: "Fri", open: "5:00 PM", close: "11:00 PM" },
    { day: "Saturday", dayShort: "Sat", open: "5:00 PM", close: "11:00 PM" },
    { day: "Sunday", dayShort: "Sun", open: "5:00 PM", close: "9:00 PM" },
  ],
} as const;

export const ADMIN_CONFIG = {
  username: "admin",
  password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "Zaragoza2026!",
  sessionDurationHours: 24,
  sessionKey: "zrg_admin_session",
} as const;

export function generateTimeSlots(dayOfWeek: number): string[] {
  // 0=Sun, 1=Mon(closed), 2=Tue, ..., 5=Fri, 6=Sat
  if (dayOfWeek === 1) return []; // Monday closed
  const closingHour =
    dayOfWeek === 5 || dayOfWeek === 6 ? 23 : dayOfWeek === 0 ? 21 : 22;
  const slots: string[] = [];
  for (let h = 17; h < closingHour; h++) {
    const hh = h.toString().padStart(2, "0");
    slots.push(`${hh}:00`);
    slots.push(`${hh}:30`);
  }
  return slots;
}

export const NAV_LINKS = [
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Private Dining", href: "/private-dining" },
  { label: "Contact", href: "/contact" },
] as const;
