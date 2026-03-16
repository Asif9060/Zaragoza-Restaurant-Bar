"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { reservationSchema, type ReservationFormData } from "@/lib/validators";
import { useReservations } from "@/hooks/useReservations";
import ProgressSteps from "@/components/ui/ProgressSteps";
import StepDateTime from "./StepDateTime";
import StepGuestInfo from "./StepGuestInfo";
import StepSpecialRequests from "./StepSpecialRequests";
import StepReview from "./StepReview";
import ReservationConfirmation from "./ReservationConfirmation";
import type { Reservation } from "@/types/reservation";

const STEPS = [
  { label: "Date & Time",      shortLabel: "When" },
  { label: "Your Details",     shortLabel: "Details" },
  { label: "Special Requests", shortLabel: "Requests" },
  { label: "Review",           shortLabel: "Review" },
];

export default function ReservationFormWrapper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  const { addReservation } = useReservations();

  const methods = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    mode: "onTouched",
    defaultValues: {
      partySize: 2,
      occasion: "none",
      seatingPreference: "no-preference",
    },
  });

  const goNext = () => {
    setDirection(1);
    setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const goPrev = () => {
    setDirection(-1);
    setCurrentStep((s) => Math.max(s - 1, 0));
  };

  const onSubmit = (data: ReservationFormData) => {
    const reservation = addReservation({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      date: data.date,
      time: data.time,
      partySize: data.partySize,
      occasion: data.occasion,
      seatingPreference: data.seatingPreference,
      dietaryRestrictions: data.dietaryRestrictions,
      specialRequests: data.specialRequests,
    });
    setConfirmedReservation(reservation);
  };

  if (confirmedReservation) {
    return <ReservationConfirmation reservation={confirmedReservation} />;
  }

  const stepComponents = [
    <StepDateTime key="dt" onNext={goNext} />,
    <StepGuestInfo key="gi" onNext={goNext} onPrev={goPrev} />,
    <StepSpecialRequests key="sr" onNext={goNext} onPrev={goPrev} />,
    <StepReview key="rv" onPrev={goPrev} />,
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        {/* Progress */}
        <div className="mb-12 px-4 md:px-0">
          <ProgressSteps steps={STEPS} currentStep={currentStep} />
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            initial={{ opacity: 0, x: direction * 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -32 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {stepComponents[currentStep]}
          </motion.div>
        </AnimatePresence>
      </form>
    </FormProvider>
  );
}
