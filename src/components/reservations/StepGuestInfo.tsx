"use client";

import { useFormContext } from "react-hook-form";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import type { ReservationFormData } from "@/lib/validators";

interface Props { onNext: () => void; onPrev: () => void; }

export default function StepGuestInfo({ onNext, onPrev }: Props) {
  const { register, trigger, formState: { errors } } = useFormContext<ReservationFormData>();

  const handleNext = async () => {
    const valid = await trigger(["firstName", "lastName", "email", "phone"]);
    if (valid) onNext();
  };

  return (
    <div className="flex flex-col gap-8 max-w-lg mx-auto">
      <div className="text-center mb-2">
        <h2 className="font-serif text-3xl font-light italic text-cream">Your Details</h2>
        <p className="font-sans text-sm text-mist mt-2 font-light">
          How should we address your reservation?
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="First Name"
          required
          placeholder="Elena"
          error={errors.firstName?.message}
          {...register("firstName")}
        />
        <FormField
          label="Last Name"
          required
          placeholder="García"
          error={errors.lastName?.message}
          {...register("lastName")}
        />
      </div>

      <FormField
        label="Email Address"
        required
        type="email"
        placeholder="elena@example.com"
        error={errors.email?.message}
        hint="Your confirmation will be sent to this address."
        {...register("email")}
      />

      <FormField
        label="Phone Number"
        required
        type="tel"
        placeholder="(216) 555-0100"
        error={errors.phone?.message}
        hint="US format. We'll call if needed."
        {...register("phone")}
      />

      <div className="flex gap-3">
        <Button
          type="button"
          variant="ghost"
          size="lg"
          onClick={onPrev}
          className="flex-shrink-0 flex items-center gap-2"
        >
          <ArrowLeft size={14} /> Back
        </Button>
        <Button type="button" variant="primary" size="lg" fullWidth onClick={handleNext}>
          Continue
        </Button>
      </div>
    </div>
  );
}
