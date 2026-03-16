import Link from "next/link";
import { CheckCircle, Calendar, Clock, Users, Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import GoldDivider from "@/components/ui/GoldDivider";
import { formatDate, formatTime } from "@/lib/utils";
import { RESTAURANT } from "@/lib/constants";
import type { Reservation } from "@/types/reservation";

interface Props { reservation: Reservation; }

export default function ReservationConfirmation({ reservation }: Props) {
  return (
    <div className="flex flex-col items-center text-center gap-6 max-w-lg mx-auto py-8">
      {/* Success icon */}
      <div className="w-16 h-16 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center">
        <CheckCircle size={28} className="text-gold" />
      </div>

      <div>
        <h2 className="font-serif text-3xl md:text-4xl font-light italic text-cream mb-2">
          Reservation Confirmed
        </h2>
        <p className="font-sans text-sm text-mist font-light">
          Thank you, {reservation.firstName}. We look forward to welcoming you.
        </p>
      </div>

      <GoldDivider className="w-full max-w-xs" />

      {/* Confirmation ID */}
      <div className="w-full rounded-lg border border-gold/20 bg-charcoal/60 px-6 py-4">
        <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-mist mb-2">
          Confirmation Number
        </p>
        <p className="font-serif text-2xl text-gold font-light tracking-widest">
          {reservation.id}
        </p>
      </div>

      {/* Summary */}
      <div className="w-full divide-y divide-ash/40 rounded-lg border border-ash overflow-hidden">
        <div className="grid grid-cols-3 divide-x divide-ash/40">
          <div className="p-4 flex flex-col items-center gap-1.5">
            <Calendar size={14} className="text-gold/60" />
            <span className="font-sans text-[9px] text-mist uppercase tracking-wider">Date</span>
            <span className="font-sans text-xs text-cream">{formatDate(reservation.date)}</span>
          </div>
          <div className="p-4 flex flex-col items-center gap-1.5">
            <Clock size={14} className="text-gold/60" />
            <span className="font-sans text-[9px] text-mist uppercase tracking-wider">Time</span>
            <span className="font-sans text-xs text-cream">{formatTime(reservation.time)}</span>
          </div>
          <div className="p-4 flex flex-col items-center gap-1.5">
            <Users size={14} className="text-gold/60" />
            <span className="font-sans text-[9px] text-mist uppercase tracking-wider">Guests</span>
            <span className="font-sans text-xs text-cream">{reservation.partySize}</span>
          </div>
        </div>
      </div>

      <div className="text-center space-y-1">
        <p className="font-sans text-xs text-mist font-light">
          A confirmation has been noted under your reservation.
        </p>
        <p className="font-sans text-xs text-mist/70 font-light">
          We will confirm within 24 hours. For urgent enquiries:
        </p>
        <a
          href={`tel:${RESTAURANT.contact.phoneRaw}`}
          className="inline-flex items-center gap-1.5 font-sans text-sm text-gold hover:text-gold-light transition-colors"
        >
          <Phone size={13} />
          {RESTAURANT.contact.phone}
        </a>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
        <Link href="/" className="flex-1">
          <Button variant="ghost" size="md" fullWidth>Return Home</Button>
        </Link>
        <Link href="/menu" className="flex-1">
          <Button variant="primary" size="md" fullWidth>Explore Our Menu</Button>
        </Link>
      </div>
    </div>
  );
}
