import { cn } from "@/lib/utils";
import type { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  asChild?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  fullWidth = false,
  loading = false,
  className,
  disabled,
  asChild: _asChild,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-sans font-normal tracking-widest uppercase transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none";

  const variants = {
    primary:
      "bg-gold text-obsidian hover:bg-gold-light active:bg-gold-dark shadow-sm hover:shadow-gold/20 hover:shadow-lg",
    ghost:
      "border border-cream/25 text-cream hover:border-gold hover:text-gold bg-transparent",
    outline:
      "border border-gold text-gold hover:bg-gold hover:text-obsidian bg-transparent",
    danger:
      "bg-red-800 text-cream hover:bg-red-700 border border-red-700",
  };

  const sizes = {
    sm: "text-xs px-5 py-2.5 rounded",
    md: "text-xs px-8 py-3.5 rounded",
    lg: "text-sm px-10 py-4 rounded",
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(
        base,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
    >
      {loading ? (
        <>
          <span className="h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
          <span>Loading…</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
