import { cn } from "@/lib/utils";

type BadgeVariant =
  | "gold"
  | "wine"
  | "green"
  | "amber"
  | "red"
  | "gray"
  | "emerald"
  | "signature";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export default function Badge({ children, variant = "gold", className }: BadgeProps) {
  const variants: Record<BadgeVariant, string> = {
    gold:      "bg-gold/15 text-gold border border-gold/30",
    wine:      "bg-wine/20 text-wine-light border border-wine/30",
    green:     "bg-green-900/30 text-green-400 border border-green-700/40",
    amber:     "bg-amber-900/30 text-amber-400 border border-amber-700/40",
    red:       "bg-red-900/30 text-red-400 border border-red-700/40",
    gray:      "bg-ash text-mist border border-slate",
    emerald:   "bg-emerald-900/30 text-emerald-400 border border-emerald-700/40",
    signature: "bg-gold text-obsidian border border-gold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-0.5 font-sans text-[10px] font-normal tracking-widest uppercase",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

// Dietary-specific badge shortcuts
export function DietaryBadge({
  isVegetarian,
  isVegan,
  isGlutenFree,
  containsNuts,
  isSignature,
}: {
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  containsNuts?: boolean;
  isSignature?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-1">
      {isSignature && <Badge variant="signature">Signature</Badge>}
      {isVegan && <Badge variant="green">Vegan</Badge>}
      {!isVegan && isVegetarian && <Badge variant="green">Vegetarian</Badge>}
      {isGlutenFree && <Badge variant="amber">Gluten-Free</Badge>}
      {containsNuts && <Badge variant="red">Contains Nuts</Badge>}
    </div>
  );
}
