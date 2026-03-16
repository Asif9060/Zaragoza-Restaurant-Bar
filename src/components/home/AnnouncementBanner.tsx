import { RESTAURANT } from "@/lib/constants";

export default function AnnouncementBanner() {
  return (
    <div className="bg-wine/20 border-y border-wine/30">
      <div className="container-site py-3.5">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <span className="text-gold/60 text-xs">◆</span>
          <p className="font-sans text-xs tracking-[0.25em] uppercase text-gold/80 text-center">
            Opening {RESTAURANT.openingDate} · {RESTAURANT.address.city}, {RESTAURANT.address.state}
          </p>
          <span className="text-gold/60 text-xs">◆</span>
          <p className="font-sans text-xs tracking-[0.25em] uppercase text-cream/50 text-center hidden sm:block">
            Now Accepting Reservations
          </p>
          <span className="text-gold/60 text-xs hidden sm:block">◆</span>
        </div>
      </div>
    </div>
  );
}
