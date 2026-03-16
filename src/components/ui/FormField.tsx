import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface BaseFieldProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  admin?: boolean;
}

interface InputFieldProps
  extends BaseFieldProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  as?: "input";
}

interface TextareaFieldProps
  extends BaseFieldProps,
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  as: "textarea";
  rows?: number;
}

type FormFieldProps = InputFieldProps | TextareaFieldProps;

export default function FormField(props: FormFieldProps) {
  const {
    label,
    error,
    hint,
    required,
    className,
    admin = false,
    as,
    ...rest
  } = props;

  const inputClass = cn(
    admin ? "input-admin" : "input-base",
    error && "!border-red-500 focus:!shadow-red-500/20"
  );

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        className={cn(
          "font-sans text-xs tracking-wider uppercase",
          admin ? "text-fog" : "text-cream-dark/70"
        )}
      >
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </label>

      {as === "textarea" ? (
        <textarea
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className={cn(inputClass, "resize-none")}
          rows={(props as TextareaFieldProps).rows ?? 4}
        />
      ) : (
        <input
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          className={inputClass}
        />
      )}

      {hint && !error && (
        <p className="text-xs text-mist font-sans">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-400 font-sans flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}
