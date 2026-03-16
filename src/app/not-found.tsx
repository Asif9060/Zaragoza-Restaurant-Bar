import Link from "next/link";
import GoldDivider from "@/components/ui/GoldDivider";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-obsidian flex items-center justify-center px-6">
      <div className="text-center max-w-lg mx-auto py-24">
        {/* Decorative number */}
        <p className="font-serif text-[120px] md:text-[160px] leading-none font-light text-gold/10 select-none">
          404
        </p>

        {/* Script accent */}
        <p
          className="font-script text-3xl text-gold/60 -mt-6 mb-4"
          style={{ fontFamily: "var(--font-script)" }}
        >
          Lo sentimos
        </p>

        <h1 className="font-serif text-3xl md:text-4xl font-light italic text-cream mb-3">
          Page Not Found
        </h1>

        <GoldDivider className="max-w-xs mx-auto my-5" />

        <p className="font-sans text-sm text-mist font-light leading-relaxed mb-8">
          The page you are looking for may have been moved, renamed, or no longer exists.
          Let us take you back to a place you know.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button variant="primary" size="lg">Return Home</Button>
          </Link>
          <Link href="/menu">
            <Button variant="ghost" size="lg">View Our Menu</Button>
          </Link>
        </div>

        {/* Bottom decorative line */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/30" />
          <span className="text-gold/30 text-xs">◆</span>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/30" />
        </div>
      </div>
    </main>
  );
}
