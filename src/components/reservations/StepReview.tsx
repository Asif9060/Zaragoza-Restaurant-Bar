"use client";

import { useFormContext } from "react-hook-form";
import { ArrowLeft, Calendar, Clock, Users, User, Mail, Phone, Star } from "lucide-react";
import Button from "@/components/ui/Button";
import { formatDate, formatTime } from "@/lib/utils";
import type { ReservationFormData } from "@/lib/validators";

interface Props { onPrev: () => void; }

const OCCASION_LABELS: Record<string, string> = {
  none: "No Special Occasion",
  birthday: "Birthday Celebration",
  anniversary: "Anniversary",
  business: "Business Dinner",
  graduation: "Graduation",
  engagement: "Engagement",
  other: "Other",
};

const SEATING_LABELS: Record<string, string> = {
  "no-preference": "No Preference",
  indoor: "Indoor",
  outdoor: "Outdoor Patio",
  bar: "Bar Seating",
  private: "Private Dining Room",
};

export default function StepReview({ onPrev }: Props) {
  const { watch, formState: { isSubmitting } } = useFormContext<ReservationFormData>();
  const data = watch();

  return (
    <div className="flex flex-col gap-8 max-w-lg mx-auto">
      <div className="text-center mb-2">
        <h2 className="font-serif text-3xl font-light italic text-cream">
          Review Your Reservation
        </h2>
        <p className="font-sans text-sm text-mist mt-2 font-light">
          Please confirm your details before submitting.
        </p>
      </div>

      <div className="rounded-lg border border-gold/20 overflow-hidden">
        {/* Header */}
        <div className="bg-wine/20 border-b border-gold/15 px-5 py-4 flex items-center gap-3">
          <Star size={14} className="text-gold flex-shrink-0" />
          <span className="font-sans text-xs tracking-widest uppercase text-gold">
            Reservation Summary
          </span>
        </div>

        {/* Details grid */}
        <div className="divide-y divide-ash/40">
          {/* Booking details */}
          <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Calendar size={14} className="text-gold/60 flex-shrink-0" />
              <div>
                <p className="font-sans text-[10px] tracking-widest uppercase text-mist mb-0.5">Date</p>
                <p className="font-sans text-sm text-cream">{data.date ? formatDate(data.date) : "—"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={14} className="text-gold/60 flex-shrink-0" />
              <div>
                <p className="font-sans text-[10px] tracking-widest uppercase text-mist mb-0.5">Time</p>
                <p className="font-sans text-sm text-cream">{data.time ? formatTime(data.time) : "—"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users size={14} className="text-gold/60 flex-shrink-0" />
              <div>
                <p className="font-sans text-[10px] tracking-widest uppercase text-mist mb-0.5">Guests</p>
                <p className="font-sans text-sm text-cream">{data.partySize}</p>
              </div>
            </div>
          </div>

          {/* Guest info */}
          <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <User size={14} className="text-gold/60 flex-shrink-0" />
              <div>
                <p className="font-sans text-[10px] tracking-widest uppercase text-mist mb-0.5">Name</p>
                <p className="font-sans text-sm text-cream">{data.firstName} {data.lastName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={14} className="text-gold/60 flex-shrink-0" />
              <div>
                <p className="font-sans text-[10px] tracking-widest uppercase text-mist mb-0.5">Email</p>
                <p className="font-sans text-sm text-cream break-all">{data.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={14} className="text-gold/60 flex-shrink-0" />
              <div>
                <p className="font-sans text-[10px] tracking-widest uppercase text-mist mb-0.5">Phone</p>
                <p className="font-sans text-sm text-cream">{data.phone}</p>
              </div>
            </div>
          </div>

          {/* Optional details */}
          {(data.occasion !== "none" || data.seatingPreference !== "no-preference" || data.dietaryRestrictions || data.specialRequests) && (
            <div className="px-5 py-4 flex flex-col gap-2.5">
              {data.occasion && data.occasion !== "none" && (
                <div>
                  <span className="font-sans text-[10px] tracking-widest uppercase text-mist">Occasion: </span>
                  <span className="font-sans text-sm text-cream">{OCCASION_LABELS[data.occasion]}</span>
                </div>
              )}
              {data.seatingPreference && data.seatingPreference !== "no-preference" && (
                <div>
                  <span className="font-sans text-[10px] tracking-widest uppercase text-mist">Seating: </span>
                  <span className="font-sans text-sm text-cream">{SEATING_LABELS[data.seatingPreference]}</span>
                </div>
              )}
              {data.dietaryRestrictions && (
                <div>
                  <span className="font-sans text-[10px] tracking-widest uppercase text-mist">Dietary: </span>
                  <span className="font-sans text-sm text-cream">{data.dietaryRestrictions}</span>
                </div>
              )}
              {data.specialRequests && (
                <div>
                  <span className="font-sans text-[10px] tracking-widest uppercase text-mist">Requests: </span>
                  <span className="font-sans text-sm text-cream">{data.specialRequests}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <p className="font-sans text-xs text-mist/70 text-center font-light leading-relaxed">
        By confirming, you agree to our cancellation policy. We will confirm your
        reservation within 24 hours. For same-day enquiries, please call us directly.
      </p>

      <div className="flex gap-3">
        <Button type="button" variant="ghost" size="lg" onClick={onPrev} className="flex-shrink-0 flex items-center gap-2">
          <ArrowLeft size={14} /> Back
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={isSubmitting}
        >
          Confirm Reservation
        </Button>
      </div>
    </div>
  );
}
