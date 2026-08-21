import { Link } from "@tanstack/react-router";

export function Crest({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 36" aria-hidden="true" className={className} fill="none">
      <path
        d="M16 1.5 30 6.5v12c0 8.4-5.8 14-14 16.9C7.8 32.5 2 26.9 2 18.5v-12L16 1.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path d="M16 9.5 19 16h6.5L20 20l2 7-6-4.3L10 27l2-7-5.5-4H13l3-6.5Z" fill="currentColor" opacity=".85" />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="Sarkar Perfumes home">
      <Crest className="h-8 w-7 text-gold transition-transform duration-500 group-hover:scale-105" />
      <span className="leading-none">
        <span className="block font-display text-2xl tracking-[0.34em] text-cream">SARKAR</span>
        {!compact && (
          <span className="mt-1 block text-[0.55rem] tracking-[0.46em] text-muted-foreground">
            PERFUMES
          </span>
        )}
      </span>
    </Link>
  );
}
