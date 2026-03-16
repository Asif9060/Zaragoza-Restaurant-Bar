import { cn } from "@/lib/utils";

interface GoldDividerProps {
  className?: string;
  slim?: boolean;
}

export default function GoldDivider({ className, slim = false }: GoldDividerProps) {
  return (
    <div className={cn("flex items-center gap-4", slim ? "my-4" : "my-8", className)}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/50" />
      <span
        className={cn(
          "text-gold flex-shrink-0",
          slim ? "text-[10px]" : "text-xs"
        )}
      >
        ◆
      </span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/50" />
    </div>
  );
}
