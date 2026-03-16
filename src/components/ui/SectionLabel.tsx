import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
}

export default function SectionLabel({
  children,
  className,
  align = "center",
}: SectionLabelProps) {
  const alignMap = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <p
      className={cn(
        "font-sans text-xs font-light tracking-[0.25em] uppercase text-gold/80",
        alignMap[align],
        className
      )}
    >
      {children}
    </p>
  );
}
