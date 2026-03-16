import type { RestaurantEvent } from "@/types/event";

export const seedEvents: RestaurantEvent[] = [
  {
    id: "ev-001",
    title: "Flamenco Night",
    description:
      "Lose yourself in the passion of live Flamenco — guitar, song, and dance woven into an unforgettable evening of authentic Spanish culture.",
    longDescription:
      "Every Friday and Saturday, Zaragoza comes alive with the fire of live Flamenco. Our resident performers bring the spirit of Andalucía to Cleveland — the raw emotion of cante jondo, the thunderous footwork of baile, and the soul-stirring resonance of the Spanish guitar. Dine while the performance unfolds around you. No tickets needed — experience included with dinner.",
    date: "2026-05-08",
    time: "20:00",
    endTime: "22:30",
    type: "flamenco",
    image:
      "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&auto=format&fit=crop",
    isActive: true,
    isRecurring: true,
    recurringNote: "Every Friday & Saturday",
    createdAt: new Date().toISOString(),
  },
  {
    id: "ev-002",
    title: "Spanish Wine Tasting Evening",
    description:
      "Journey through Spain's most celebrated wine regions guided by our Sommelier — from Rioja to Ribera, Cava to Albariño.",
    longDescription:
      "Join our Head Sommelier for an exclusive guided tasting of eight exceptional Spanish wines, each paired with artisan tapas. Explore the bold Tempranillos of Rioja, the structured elegance of Ribera del Duero, the refreshing minerality of Galician Albariño, and the festive sparkle of traditional Cava. Limited to 24 guests. Includes tasting menu and wine notes.",
    date: "2026-05-22",
    time: "19:00",
    endTime: "21:30",
    type: "wine-tasting",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop",
    price: 95,
    capacity: 24,
    isActive: true,
    isRecurring: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "ev-003",
    title: "Tapas & Jazz Sunday",
    description:
      "A relaxed Sunday evening of live jazz, flowing Spanish wine, and an extended Tapas menu curated for sharing.",
    longDescription:
      "Every Sunday, our dining room transforms into an intimate jazz lounge. Sip on house Sangria or choose from our extensive wine list while a live jazz quartet plays the evening away. Our Sunday Tapas menu features extended sharing plates not available during the week. Perfect for groups looking to unwind in style.",
    date: "2026-05-10",
    time: "18:00",
    endTime: "21:00",
    type: "live-music",
    image:
      "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&auto=format&fit=crop",
    isActive: true,
    isRecurring: true,
    recurringNote: "Every Sunday",
    createdAt: new Date().toISOString(),
  },
  {
    id: "ev-004",
    title: "Grand Opening Gala",
    description:
      "Celebrate the arrival of Zaragoza Restaurant & Bar — a landmark evening marking a new chapter in Cleveland's culinary story.",
    longDescription:
      "On the evening of May 1st, 2026, we open our doors to Cleveland in grand style. Join us for a celebratory reception featuring complimentary Cava, a showcase of our chef's signature dishes, live Flamenco performance, and a ribbon-cutting ceremony. Tickets include a four-course tasting menu and a gift from the restaurant. This is a night Cleveland will remember.",
    date: "2026-05-01",
    time: "18:30",
    endTime: "23:00",
    type: "special-menu",
    image:
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&auto=format&fit=crop",
    price: 0,
    capacity: 120,
    isActive: true,
    isRecurring: false,
    createdAt: new Date().toISOString(),
  },
];
