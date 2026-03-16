"use client";

import { useFormContext } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import type { ReservationFormData } from "@/lib/validators";

interface Props { onNext: () => void; onPrev: () => void; }

const OCCASIONS = [
  { value: "none",         label: "No Special Occasion" },
  { value: "birthday",     label: "Birthday Celebration" },
  { value: "anniversary",  label: "Anniversary" },
  { value: "business",     label: "Business Dinner" },
  { value: "graduation",   label: "Graduation" },
  { value: "engagement",   label: "Engagement" },
  { value: "other",        label: "Other Occasion" },
];

const SEATING = [
  { value: "no-preference", label: "No Preference" },
  { value: "indoor",        label: "Indoor" },
  { value: "outdoor",       label: "Outdoor Patio" },
  { value: "bar",           label: "Bar Seating" },
  { value: "private",       label: "Private Dining Room" },
];

export default function StepSpecialRequests({ onNext, onPrev }: Props) {
  const { register, watch, trigger, formState: { errors } } = useFormContext<ReservationFormData>();
  const specialRequests = watch("specialRequests") ?? "";

  const handleNext = async () => {
    const valid = await trigger(["specialRequests"]);
    if (valid) onNext();
  };

  return (
    <div className="flex flex-col gap-8 max-w-lg mx-auto">
      <div className="text-center mb-2">
        <h2 className="font-serif text-3xl font-light italic text-cream">Special Requests</h2>
        <p className="font-sans text-sm text-mist mt-2 font-light">
          Help us make your visit truly memorable. All fields are optional.
        </p>
      </div>

      {/* Occasion */}
      <div className="flex flex-col gap-2">
        <label className="font-sans text-xs tracking-wider uppercase text-cream-dark/70">
          Occasion
        </label>
        <select
          {...register("occasion")}
          className="input-base"
          defaultValue="none"
        >
          {OCCASIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Seating preference */}
      <div className="flex flex-col gap-3">
        <label className="font-sans text-xs tracking-wider uppercase text-cream-dark/70">
          Seating Preference
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {SEATING.map((s) => {
            const selected = watch("seatingPreference") === s.value;
            return (
              <label
                key={s.value}
                className={`flex items-center gap-2 px-3 py-2.5 rounded border cursor-pointer transition-all duration-200 font-sans text-xs ${
                  selected
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-slate bg-ash text-cream/60 hover:border-gold/40"
                }`}
              >
                <input
                  type="radio"
                  value={s.value}
                  {...register("seatingPreference")}
                  className="sr-only"
                />
                {s.label}
              </label>
            );
          })}
        </div>
      </div>

      {/* Dietary */}
      <FormField
        label="Dietary Requirements or Allergies"
        placeholder="e.g. nut allergy, vegetarian, lactose intolerant..."
        error={errors.dietaryRestrictions?.message}
        {...register("dietaryRestrictions")}
      />

      {/* Special requests */}
      <div className="flex flex-col gap-1.5">
        <label className="font-sans text-xs tracking-wider uppercase text-cream-dark/70">
          Additional Requests
        </label>
        <textarea
          {...register("specialRequests")}
          rows={3}
          maxLength={500}
          placeholder="High chair needed, celebrating a birthday cake, window table preference..."
          className={`input-base resize-none ${errors.specialRequests ? "!border-red-500" : ""}`}
        />
        <div className="flex justify-between items-center">
          {errors.specialRequests ? (
            <p className="text-xs text-red-400 font-sans">⚠ {errors.specialRequests.message}</p>
          ) : (
            <span />
          )}
          <span className="text-xs text-mist font-sans">
            {specialRequests.length}/500
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="ghost" size="lg" onClick={onPrev} className="flex-shrink-0 flex items-center gap-2">
          <ArrowLeft size={14} /> Back
        </Button>
        <Button type="button" variant="primary" size="lg" fullWidth onClick={handleNext}>
          Review Reservation
        </Button>
      </div>
    </div>
  );
}
