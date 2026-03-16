import { cn } from "@/lib/utils";

interface ScriptAccentProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  align?: "left" | "center" | "right";
}

export default function ScriptAccent({
  children,
  className,
  size = "md",
  align = "center",
}: ScriptAccentProps) {
  const sizeMap = {
    sm: "text-2xl md:text-3xl",
    md: "text-3xl md:text-4xl",
    lg: "text-4xl md:text-5xl",
  };

  const alignMap = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <p
      className={cn(
        "font-script text-gold/80",
        sizeMap[size],
        alignMap[align],
        className
      )}
    >
      {children}
    </p>
  );
}
