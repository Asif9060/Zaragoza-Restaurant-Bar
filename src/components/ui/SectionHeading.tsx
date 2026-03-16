import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
  italic?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  as?: "h1" | "h2" | "h3" | "h4";
}

export default function SectionHeading({
  children,
  className,
  align = "center",
  italic = false,
  size = "lg",
  as: Tag = "h2",
}: SectionHeadingProps) {
  const alignMap = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const sizeMap = {
    sm: "text-3xl md:text-4xl",
    md: "text-4xl md:text-5xl",
    lg: "text-4xl md:text-5xl lg:text-6xl",
    xl: "text-5xl md:text-6xl lg:text-7xl",
  };

  return (
    <Tag
      className={cn(
        "font-serif font-light text-cream leading-tight",
        sizeMap[size],
        alignMap[align],
        italic && "italic",
        className
      )}
    >
      {children}
    </Tag>
  );
}
