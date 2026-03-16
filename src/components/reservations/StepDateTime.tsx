"use client";

import { useFormContext } from "react-hook-form";
import { ChevronUp, ChevronDown } from "lucide-react";
import { generateTimeSlots } from "@/lib/constants";
import { formatTime, todayString } from "@/lib/utils";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import type { ReservationFormData } from "@/lib/validators";

interface Props { onNext: () => void; }

export default function StepDateTime({ onNext }: Props) {
  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<ReservationFormData>();

  const date = watch("date");
  const partySize = watch("partySize") ?? 2;

  const dayOfWeek = date ? new Date(date + "T00:00:00").getDay() : -1;
  const timeSlots = dayOfWeek >= 0 ? generateTimeSlots(dayOfWeek) : [];

  const handleNext = async () => {
    const valid = await trigger(["date", "time", "partySize"]);
    if (valid) onNext();
  };

  return (
    <div className="flex flex-col gap-8 max-w-lg mx-auto">
      <div className="text-center mb-2">
        <h2 className="font-serif text-3xl font-light italic text-cream">
          When Would You Like to Dine?
        </h2>
        <p className="font-sans text-sm text-mist mt-2 font-light">
          Select your preferred date, time, and party size.
        </p>
      </div>

      {/* Date */}
      <FormField
        label="Date"
        required
        as="input"
        type="date"
        min={todayString()}
        error={errors.date?.message}
        {...register("date")}
      />

      {/* Time slots */}
      {date && timeSlots.length === 0 ? (
        <div className="p-4 rounded-lg bg-ash border border-slate text-center">
          <p className="font-sans text-sm text-mist">
            We are closed on Mondays. Please select another day.
          </p>
        </div>
      ) : date && (
        <div className="flex flex-col gap-2">
          <label className="font-sans text-xs tracking-wider uppercase text-cream-dark/70">
            Time <span className="text-gold">*</span>
          </label>
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((slot) => {
              const selected = watch("time") === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setValue("time", slot)}
                  className={`py-2.5 rounded font-sans text-xs tracking-wide transition-all duration-200 border ${
                    selected
                      ? "bg-gold text-obsidian border-gold"
                      : "bg-ash text-cream/70 border-slate hover:border-gold/50 hover:text-cream"
                  }`}
                >
                  {formatTime(slot)}
                </button>
              );
            })}
          </div>
          {errors.time && (
            <p className="text-xs text-red-400 font-sans flex items-center gap-1">
              <span>⚠</span> {errors.time.message}
            </p>
          )}
        </div>
      )}

      {/* Party size stepper */}
      <div className="flex flex-col gap-2">
        <label className="font-sans text-xs tracking-wider uppercase text-cream-dark/70">
          Party Size <span className="text-gold">*</span>
        </label>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setValue("partySize", Math.max(1, partySize - 1))}
            disabled={partySize <= 1}
            className="w-10 h-10 rounded border border-slate text-cream hover:border-gold hover:text-gold transition-all disabled:opacity-30 flex items-center justify-center"
          >
            <ChevronDown size={18} />
          </button>
          <span className="font-serif text-3xl text-cream font-light w-12 text-center">
            {partySize}
          </span>
          <button
            type="button"
            onClick={() => setValue("partySize", Math.min(20, partySize + 1))}
            disabled={partySize >= 20}
            className="w-10 h-10 rounded border border-slate text-cream hover:border-gold hover:text-gold transition-all disabled:opacity-30 flex items-center justify-center"
          >
            <ChevronUp size={18} />
          </button>
          <span className="font-sans text-sm text-mist font-light">
            {partySize === 1 ? "Guest" : "Guests"}
          </span>
        </div>
        {partySize >= 12 && (
          <p className="text-xs text-gold/80 font-sans font-light">
            For parties of 12 or more, we may recommend our private dining spaces.
          </p>
        )}
        {errors.partySize && (
          <p className="text-xs text-red-400 font-sans">⚠ {errors.partySize.message}</p>
        )}
      </div>

      <Button type="button" variant="primary" size="lg" fullWidth onClick={handleNext}>
        Continue
      </Button>
    </div>
  );
}
