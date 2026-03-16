export default function Loading() {
  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        {/* Animated logo text */}
        <p
          className="font-serif text-2xl font-light tracking-[0.3em] uppercase text-cream/20 animate-pulse"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Zaragoza
        </p>

        {/* Gold spinner */}
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-2 border-gold/10" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold/70 animate-spin" />
        </div>

        {/* Decorative dots */}
        <div className="flex items-center gap-2">
          {[0, 0.2, 0.4].map((delay) => (
            <span
              key={delay}
              className="w-1 h-1 rounded-full bg-gold/40 animate-pulse"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
