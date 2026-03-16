import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  label: string;
  shortLabel?: string;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export default function ProgressSteps({
  steps,
  currentStep,
  className,
}: ProgressStepsProps) {
  return (
    <div className={cn("flex items-center w-full", className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent  = index === currentStep;

        return (
          <div key={index} className="flex items-center flex-1 last:flex-none">
            {/* Step circle */}
            <div className="flex flex-col items-center gap-1.5 relative">
              <div
                className={cn(
                  "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 text-xs font-sans font-normal",
                  isCompleted
                    ? "bg-gold border-gold text-obsidian"
                    : isCurrent
                    ? "border-gold text-gold bg-transparent"
                    : "border-slate text-stone bg-transparent"
                )}
              >
                {isCompleted ? (
                  <Check size={14} strokeWidth={2.5} />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  "absolute -bottom-6 text-[10px] font-sans tracking-wider uppercase whitespace-nowrap hidden sm:block",
                  isCurrent  ? "text-gold"  : "text-mist"
                )}
              >
                {step.shortLabel ?? step.label}
              </span>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-px mx-2 transition-all duration-500",
                  isCompleted ? "bg-gold/60" : "bg-slate"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
